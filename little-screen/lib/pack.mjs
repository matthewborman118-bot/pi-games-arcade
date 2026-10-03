export const WIDTH=160, HEIGHT=80, FRAMES=36, FPS=10, FRAME_BYTES=25600, BYTE_LENGTH=921600;
const MAGIC=new TextEncoder().encode('MSUPACK1');
export async function sha256(bytes){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(n=>n.toString(16).padStart(2,'0')).join('');}
export async function encodePack(bytes,name='My animation'){
 if(!(bytes instanceof Uint8Array)||bytes.length!==BYTE_LENGTH)throw Error('Animation must contain exactly 36 frames at 160 × 80.');
 const metadata={format:'msu-animation',version:1,name:String(name).slice(0,80),width:WIDTH,height:HEIGHT,frames:FRAMES,fps:FPS,encoding:'RGB565-BE',sha256:await sha256(bytes)};
 const json=new TextEncoder().encode(JSON.stringify(metadata));const result=new Uint8Array(12+json.length+bytes.length);
 result.set(MAGIC);new DataView(result.buffer).setUint32(8,json.length,false);result.set(json,12);result.set(bytes,12+json.length);return result;
}
export async function decodePack(input){
 const bytes=input instanceof Uint8Array?input:new Uint8Array(input);
 if(bytes.length<12||MAGIC.some((v,i)=>bytes[i]!==v))throw Error('This is not a Little Screen animation pack (.msupack).');
 const length=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength).getUint32(8,false);
 if(length<2||length>4096||bytes.length!==12+length+BYTE_LENGTH)throw Error('Animation pack is incomplete or has an invalid size.');
 let meta;try{meta=JSON.parse(new TextDecoder().decode(bytes.subarray(12,12+length)));}catch{throw Error('Animation pack metadata is invalid.');}
 if(meta.format!=='msu-animation'||meta.version!==1||meta.width!==WIDTH||meta.height!==HEIGHT||meta.frames!==FRAMES||meta.fps!==FPS||meta.encoding!=='RGB565-BE')throw Error('This pack is not compatible with the 160 × 80 MSU2 Mini.');
 const data=bytes.slice(12+length);if(await sha256(data)!==meta.sha256)throw Error('Animation checksum failed. Download the pack again.');
 return {meta,data,bytes};
}
export function drawFrame(canvas,data,frame){
 const context=canvas.getContext('2d');const pixels=context.createImageData(WIDTH,HEIGHT);const offset=(frame%FRAMES)*FRAME_BYTES;
 for(let i=0;i<WIDTH*HEIGHT;i++){const p=(data[offset+i*2]<<8)|data[offset+i*2+1];pixels.data[i*4]=Math.round((p>>11)*255/31);pixels.data[i*4+1]=Math.round(((p>>5)&63)*255/63);pixels.data[i*4+2]=Math.round((p&31)*255/31);pixels.data[i*4+3]=255;}
 context.putImageData(pixels,0,0);
}
function bitmapBytes(bitmap){
 const canvas=new OffscreenCanvas(WIDTH,HEIGHT),context=canvas.getContext('2d');
 const sourceWidth=bitmap.displayWidth||bitmap.width,sourceHeight=bitmap.displayHeight||bitmap.height;
 if(!sourceWidth||!sourceHeight)throw Error('The image dimensions could not be read.');
 const scale=Math.max(WIDTH/sourceWidth,HEIGHT/sourceHeight),w=sourceWidth*scale,h=sourceHeight*scale;
 context.drawImage(bitmap,(WIDTH-w)/2,(HEIGHT-h)/2,w,h);
 const rgb=context.getImageData(0,0,WIDTH,HEIGHT).data,result=new Uint8Array(FRAME_BYTES);
 for(let i=0,j=0;i<rgb.length;i+=4,j+=2){const p=((rgb[i]>>3)<<11)|((rgb[i+1]>>2)<<5)|(rgb[i+2]>>3);result[j]=p>>8;result[j+1]=p&255;}return result;
}
export async function imageToPack(file,name){
 if(file.size>20*1024*1024)throw Error('Choose an image or GIF smaller than 20 MB.');
 const frames=[],durations=[];
 if(file.type==='image/gif'||/\.gif$/i.test(file.name)){
  if(!('ImageDecoder' in globalThis)||!await ImageDecoder.isTypeSupported('image/gif'))throw Error('GIF import needs a recent desktop Chrome or Edge. You can still import prepared animation packs.');
  const decoder=new ImageDecoder({data:await file.arrayBuffer(),type:'image/gif'});
  try{
   await decoder.tracks.ready;const count=decoder.tracks.selectedTrack.frameCount;
   if(count>512)throw Error('Choose a GIF with 512 frames or fewer.');
   for(let i=0;i<count;i++){const {image}=await decoder.decode({frameIndex:i});try{frames.push(bitmapBytes(image));durations.push(Math.max(20,(image.duration||100000)/1000));}finally{image.close();}}
  }finally{decoder.close();}
 }else{
  const bitmap=await createImageBitmap(file);try{frames.push(bitmapBytes(bitmap));durations.push(100);}finally{bitmap.close();}
 }
 if(!frames.length)throw Error('The image contains no usable frames.');
 const result=new Uint8Array(BYTE_LENGTH),duration=durations.reduce((a,b)=>a+b,0);
 for(let f=0;f<FRAMES;f++){const target=f/FRAMES*duration;let index=0,end=durations[0];while(end<=target&&index<frames.length-1)end+=durations[++index];result.set(frames[index],f*FRAME_BYTES);}
 return decodePack(await encodePack(result,name));
}
