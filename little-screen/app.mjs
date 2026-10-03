import {decodePack,encodePack,imageToPack,drawFrame} from './lib/pack.mjs';
import {MsuDevice,SerialTransport} from './lib/device.mjs';
const $=id=>document.getElementById(id);
const state={items:[],selected:null,pack:null,port:null,busy:false,paused:matchMedia('(prefers-reduced-motion: reduce)').matches,frame:0,selection:0};
let activeDevice=null;
function message(text,error=false){$('message').textContent=text;$('message').className=error?'error':'success';}
function controls(){
 const supported='serial' in navigator&&isSecureContext;
 $('connect').disabled=state.busy||!supported;$('flash').disabled=state.busy||!state.port||!state.pack;
 $('backup').disabled=state.busy||!state.port;$('download').disabled=!state.pack||state.busy;$('import-file').disabled=state.busy;
 $('connect').textContent=state.port?'Choose another screen':'Connect a screen';
 $('connection-state').textContent=state.port?'MSU2 Mini selected · ready':'No screen selected';
 $('connection-dot').classList.toggle('connected',!!state.port);
 $('pause').textContent=state.paused?'Play':'Pause';$('pause').setAttribute('aria-label',state.paused?'Play preview':'Pause preview');
 if(!supported)$('browser-note').textContent='Preview and download here. To load a screen, open this HTTPS website in desktop Chrome or Edge.';
}
function download(bytes,name,type='application/octet-stream'){
 const url=URL.createObjectURL(new Blob([bytes],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
function safeName(name){return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'animation';}
function renderCards(){
 const query=$('search').value.trim().toLowerCase();const items=state.items.filter(item=>(item.name+' '+item.description).toLowerCase().includes(query));
 $('cards').replaceChildren();
 if(!items.length){const empty=document.createElement('p');empty.className='empty';empty.textContent='No matching companions. Try another name or import your own below.';$('cards').append(empty);}
 for(const item of items){
  const article=document.createElement('article');article.className='card'+(state.selected===item?' selected':'');
  const img=document.createElement('img');img.className='card-image';img.alt=item.name+' animation preview';img.src=item.preview;img.width=160;img.height=80;
  const content=document.createElement('div');content.className='card-content';
  const badge=document.createElement('span');badge.className='badge';badge.textContent=item.imported?'Your own creation':'The truck collection';
  const title=document.createElement('h3');title.textContent=item.name;
  const description=document.createElement('p');description.textContent=item.description;
  const button=document.createElement('button');button.textContent=state.selected===item?'Selected ✓':'Meet this companion →';button.disabled=state.busy;button.setAttribute('aria-label','Select '+item.name);button.onclick=()=>select(item);
  content.append(badge,title,description,button);article.append(img,content);$('cards').append(article);
 }
}
async function select(item){
 if(state.busy)return;const selection=++state.selection;state.selected=item;state.pack=null;state.frame=0;controls();renderCards();
 $('selected-name').textContent=item.name;$('selected-description').textContent=item.description;$('hero-name').textContent=item.name;
 try{
  const pack=item.pack||await (async()=>{const response=await fetch(item.file);if(!response.ok)throw Error('This animation pack could not be downloaded.');return decodePack(await response.arrayBuffer());})();
  if(selection!==state.selection)return;item.pack=pack;state.pack=pack;drawFrame($('hero-canvas'),pack.data,0);controls();
 }catch(error){if(selection===state.selection){message(error.message,true);controls();}}
}
function progress(phase,value){$('progress-wrap').hidden=false;$('phase').textContent=phase;$('percent').textContent=Math.round(value*100)+'%';$('progress').value=value;}
async function withDevice(job){
 if(state.busy)return;state.busy=true;controls();renderCards();message('');let lock=null;
 try{
  try{lock=await navigator.wakeLock?.request('screen');}catch{}
  activeDevice=new MsuDevice(new SerialTransport(state.port));await activeDevice.connect();await job(activeDevice);
 }catch(error){message(error.message+(error.name==='NetworkError'?' Check the USB connection and close any other screen software.':''),true);state.port=null;}
 finally{await activeDevice?.close();activeDevice=null;await lock?.release().catch(()=>{});state.busy=false;controls();renderCards();}
}
$('connect').onclick=async()=>{
 if(state.busy)return;
 try{const port=await navigator.serial.requestPort({filters:[{usbVendorId:0x1a86,usbProductId:0xfe0c}]});state.port=port;await withDevice(async()=>message('Screen checked. Choose Load onto screen when you’re ready.'));}
 catch(error){if(error.name!=='NotFoundError')message(error.message,true);controls();}
};
$('flash').onclick=()=>{if(!state.pack||!state.port||state.busy)return;const pack=state.pack,name=state.selected.name;
 return withDevice(async device=>{progress('Connecting',0);await device.flash(pack.data,progress);message(`${name} is loaded and verified. It will play on its own after the connection closes.`);});
};
$('backup').onclick=()=>{if(!state.port||state.busy)return;
 return withDevice(async device=>{progress('Saving current animation',0);const data=await device.backup(value=>progress('Saving current animation',value));const bytes=await encodePack(data,'Saved screen animation');download(bytes,'screen-backup.msupack');message('Your current animation was saved as a reusable pack.');});
};
$('download').onclick=()=>{if(state.pack)download(state.pack.bytes,safeName(state.selected.name)+'.msupack');};
$('search').oninput=renderCards;$('pause').onclick=()=>{state.paused=!state.paused;controls();};
$('import-file').onchange=async event=>{
 const file=event.target.files[0];if(!file||state.busy)return;
 state.busy=true;controls();renderCards();$('import-message').className='';$('import-message').textContent='Preparing your animation…';
 let item;
 try{
  if(file.size>20*1024*1024)throw Error('Please choose a file smaller than 20 MB.');
  const name=$('pack-name').value.trim()||file.name.replace(/\.[^.]+$/,'');
  const pack=/\.msupack$/i.test(file.name)?await decodePack(await file.arrayBuffer()):await imageToPack(file,name);
  const canvas=document.createElement('canvas');canvas.width=160;canvas.height=80;drawFrame(canvas,pack.data,0);
  item={name:pack.meta.name,description:'Your own animation, ready for a little screen.',preview:canvas.toDataURL(),pack,imported:true};state.items.unshift(item);
  $('import-message').textContent='Ready! Your animation is selected above. Download its pack to keep it or add it to the GitHub collection.';
 }catch(error){$('import-message').className='error';$('import-message').textContent=error.message;}
 finally{state.busy=false;event.target.value='';controls();renderCards();if(item){$('search').value='';await select(item);}}
};
navigator.serial?.addEventListener('disconnect',event=>{if(event.target===state.port){state.port=null;controls();if(!state.busy)message('Screen unplugged. Connect a screen to load another animation.');}});
window.addEventListener('beforeunload',event=>{if(state.busy){event.preventDefault();event.returnValue='';}});
setInterval(()=>{if(state.pack&&!state.paused&&!document.hidden){state.frame=(state.frame+1)%36;drawFrame($('hero-canvas'),state.pack.data,state.frame);}},100);
async function init(){
 controls();try{const response=await fetch('catalog.json');if(!response.ok)throw Error('Could not load the animation collection.');const catalog=await response.json();state.items=catalog.animations;
 if(catalog.github){$('github-link').href=catalog.github;$('github-link').hidden=false;}renderCards();if(state.items[0])await select(state.items[0]);
 }catch(error){$('cards').textContent=error.message;message('Run this website from HTTPS or a local web server, rather than opening its files directly.',true);}
}
init();
