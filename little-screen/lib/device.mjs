import {BYTE_LENGTH,FRAME_BYTES,FRAMES,sha256} from './pack.mjs';
export function pagePacket(page,data){
 if(!Number.isInteger(page)||page<0||page>=3600||data.length!==256)throw Error('Write is outside the animation area.');
 const packet=new Uint8Array(390);for(let i=0;i<64;i++){packet[i*6]=4;packet[i*6+1]=i;packet.set(data.subarray(i*4,i*4+4),i*6+2);}
 packet.set([3,3,0,page>>8,page&255,1],384);return packet;
}
export class SerialTransport{
 constructor(port){this.port=port;this.buffer=[];this.waiter=null;this.failure=null;this.closing=false;}
 async open(){
  await this.port.open({baudRate:19200,dataBits:8,stopBits:1,parity:'none',flowControl:'none',bufferSize:4096});
  await this.port.setSignals({dataTerminalReady:true,requestToSend:false});
  this.reader=this.port.readable.getReader();this.writer=this.port.writable.getWriter();this.pumping=this.pump();
 }
 async pump(){
  try{while(!this.closing){const {value,done}=await this.reader.read();if(done)break;this.buffer.push(...value);if(this.buffer.length>16384)throw Error('Unexpected data overflow; reconnect the screen.');this.deliver();}
   if(!this.closing)throw Error('Screen disconnected.');
  }catch(e){if(!this.closing){this.failure=e;this.waiter?.reject(e);this.waiter=null;}}
 }
 deliver(){if(this.waiter&&this.buffer.length>=this.waiter.n){const w=this.waiter;this.waiter=null;w.resolve(Uint8Array.from(this.buffer.splice(0,w.n)));}}
 read(n,timeout=10000){
  if(this.failure)return Promise.reject(this.failure);if(this.waiter)return Promise.reject(Error('Overlapping serial reads.'));
  return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{this.waiter=null;const error=Error('Screen response timed out. Reconnect the screen before trying again.');error.code='SERIAL_TIMEOUT';reject(error);},timeout);
   this.waiter={n,resolve:value=>{clearTimeout(timer);resolve(value);},reject:error=>{clearTimeout(timer);reject(error);}};this.deliver();});
 }
 async write(bytes){if(this.failure)throw this.failure;await this.writer.write(bytes);}
 clear(){this.buffer=[];}
 async close(){
  this.closing=true;this.waiter?.reject(Error('Connection closed.'));this.waiter=null;
  try{await this.reader?.cancel();await this.pumping;}catch{}try{this.reader?.releaseLock();}catch{}try{this.writer?.releaseLock();}catch{}
  try{await this.port.close();}catch{}
 }
}
export class MsuDevice{
 constructor(transport){this.transport=transport;this.identity=null;}
 async connect(){
  await this.transport.open();const history=[];let version=null;
  const deadline=Date.now()+10000;
  while(Date.now()<deadline){
   try{history.push((await this.transport.read(1,history.length?Math.max(1,deadline-Date.now()):1500))[0]);}
   catch(error){if(error.code==='SERIAL_TIMEOUT'&&history.length===0)break;throw error;}
   if(history.length>64)history.shift();const str=String.fromCharCode(...history);const match=str.match(/\x00MSN(\d\d)/);if(match){version=Number(match[1]);break;}
  }
  if(version===null&&history.length)throw Error('Screen startup greeting was incomplete. Unplug and reconnect it, then try again.');
  // A previously connected screen can stay in command mode without repeating its greeting.
  // In that case use only read-only resolution queries before allowing any flash writes.
  if(version!==null){
  const handshake=Uint8Array.from([0,77,83,78,67,78]);await this.transport.write(handshake);
  const reply=[];let confirmed=false;
  for(let i=0;i<192;i++){reply.push((await this.transport.read(1))[0]);if(reply.length>6)reply.shift();if(reply.length===6&&handshake.every((v,j)=>reply[j]===v)){confirmed=true;break;}}
  if(!confirmed)throw Error('Screen handshake was not confirmed.');
  }this.transport.clear();
  const width=await this.readU16(0),height=await this.readU16(1);
  if(width!==160||height!==80)throw Error(`This screen reports ${width} × ${height}; this uploader supports 160 × 80 only.`);
  this.identity={version,width,height};return this.identity;
 }
 async exchange(packet,prefix=packet.subarray(0,5),timeout=10000){
  await this.transport.write(packet);const reply=await this.transport.read(6,timeout);
  if(reply.length!==6||!prefix.every((v,i)=>v===reply[i]))throw Error('Unexpected screen reply. No further writes were sent.');return reply;
 }
 async readU16(address){const command=Uint8Array.from([0,48,32,address,0,0]);const r=await this.exchange(command,command.subarray(0,4));return (r[4]<<8)|r[5];}
 async readRange(start,count,progress=()=>{}){
  if(start<0||count<0||start+count>BYTE_LENGTH)throw Error('Read is outside the animation area.');
  const out=new Uint8Array(count);
  for(let i=0;i<count;i++){const a=start+i;const command=Uint8Array.from([3,0,a>>16,(a>>8)&255,a&255,0]);out[i]=(await this.exchange(command))[5];if(i%1024===0)progress(i/count);}
  progress(1);return out;
 }
 async backup(progress){if(!this.identity)throw Error('Connect a compatible screen first.');return this.readRange(0,BYTE_LENGTH,progress);}
 async flash(data,progress=()=>{}){
  if(!this.identity)throw Error('Connect a compatible screen first.');
  if(!(data instanceof Uint8Array)||data.length!==BYTE_LENGTH)throw Error('Invalid animation size.');
  // Only the 3,600 animation pages are erased; photo/font storage starts later.
  progress('Preparing screen memory',0);
  try{await this.exchange(Uint8Array.from([3,2,0,0,14,16]),Uint8Array.from([3,2]),120000);}catch(error){throw Error('Preparing screen memory: '+error.message);}
  for(let page=0;page<3600;page++){try{await this.exchange(pagePacket(page,data.subarray(page*256,(page+1)*256)),Uint8Array.from([3,3]),15000);}catch(error){throw Error(`Writing animation, page ${page+1} of 3600: ${error.message}`);}if(page%10===0)progress('Writing animation',(page+1)/3600*.45);}
  let verified=0;
  for(let frame=0;frame<FRAMES;frame++){
   const start=frame*FRAME_BYTES;let readback;
   try{readback=await this.readRange(start,FRAME_BYTES,p=>progress('Checking stored animation',.45+.55*(frame+p)/FRAMES));}catch(error){throw Error(`Checking stored animation, frame ${frame+1} of ${FRAMES}: ${error.message}`);}
   for(let i=0;i<readback.length;i++)if(readback[i]!==data[start+i])throw Error(`Stored animation did not match at byte ${start+i}. Reconnect and load the pack again.`);
   verified+=readback.length;
  }
  progress('Animation verified',1);return {verifiedBytes:verified,sha256:await sha256(data)};
 }
 async close(){await this.transport.close();this.identity=null;}
}
