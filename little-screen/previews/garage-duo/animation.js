if(new URLSearchParams(location.search).get('scene')==='shark')location.replace('../shark-glass-inspector/');
// Original canvas artwork, rendered at 3x and downsampled to the device's 160x80.
const canvas=document.getElementById('display'),out=canvas.getContext('2d');
const stage=document.createElement('canvas');stage.width=960;stage.height=480;
const c=stage.getContext('2d');c.scale(3,3);
const TAU=Math.PI*2;
const names={wash:'Car Wash Chaos',alien:'Cosmic Grease Monkey',demon:'Supercharged Dodge',dragon:'Dragon Behind the Glass',shark:'Shark Glass Inspector',robot:'Orbital Cleanup',ghost:'Phantom Garage',raccoon:'Raccoon Pit Crew'};
const ids={wash:'car-wash-chaos',alien:'cosmic-grease-monkey',demon:'supercharged-dodge',dragon:'dragon-behind-glass',shark:'shark-glass-inspector',robot:'orbital-cleanup',ghost:'phantom-garage',raccoon:'raccoon-pit-crew'};
const requested=new URLSearchParams(location.search).get('scene'),kind=Object.hasOwn(names,requested)?requested:'wash';
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},pulse=(p,a,b,d=.08)=>ease((p-a)/d)*(1-ease((p-b)/d));
function ellipse(x,y,rx,ry,fill,stroke,w=1){c.beginPath();c.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),0,0,TAU);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke()}}
function line(x,y,X,Y,color,w=1){c.beginPath();c.moveTo(x,y);c.lineTo(X,Y);c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.stroke()}
function poly(pts,fill,stroke,w=1){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke()}}
function rect(x,y,w,h,r,fill,stroke,lw=1){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke()}}
function grad(x,y,X,Y,stops){const g=c.createLinearGradient(x,y,X,Y);stops.forEach(([v,col])=>g.addColorStop(v,col));return g}
function star(x,y,size,color,spin=0){c.save();c.translate(x,y);c.rotate(spin);poly([[0,-size],[size*.24,-size*.24],[size,0],[size*.24,size*.24],[0,size],[-size*.24,size*.24],[-size,0],[-size*.24,-size*.24]],color);c.restore()}
function bubble(x,y,r,alpha=1){c.save();c.globalAlpha=alpha;ellipse(x,y,r,r,'#b7f3f5','#f2ffff',.8);ellipse(x-r*.28,y-r*.3,r*.25,r*.16,'white');c.restore()}
function eye(x,y,rx,ry,look=0,blink=0){ellipse(x,y,rx,ry*(1-blink)+.4,'#fffadf','#345457',1);if(blink<.75){ellipse(x+look,y+1,rx*.47,ry*.68*(1-blink),'#183a47');ellipse(x+look-1,y-ry*.25,rx*.16,ry*.22*(1-blink),'white')}}
function wheel(x,y,a){ellipse(x,y,11,18,'#142d3b','#051c2b',2);ellipse(x,y,7,12,grad(x-7,y,x+7,y,[[0,'#60788b'],[.45,'#e6f7f5'],[1,'#5c7890']]),'#203e50',1);for(let i=0;i<5;i++){const q=a+i*TAU/5;line(x+Math.cos(q)*2,y+Math.sin(q)*3,x+Math.cos(q)*5,y+Math.sin(q)*9,'#365167',2)}ellipse(x,y,2,3,'#effff9')}
function truck(a,mud,surprised){
 const bob=Math.sin(a*3)*1.5;c.save();c.translate(0,bob);
 ellipse(160,143,75,5,'#09293788');wheel(108,123,a*2);wheel(212,123,a*2);
 poly([[107,80],[115,43],[128,36],[193,36],[207,45],[214,82]],grad(100,35,220,88,[[0,'#ffcf68'],[.35,'#ff8c36'],[1,'#b63729']]),'#642f2c',2);
 rect(117,44,86,36,9,'#173743','#ffdc8f',2);
 poly([[121,48],[151,48],[130,74],[119,74]],'#58a4a8');line(161,46,161,75,'#457882',2);
 const blink=pulse(a/TAU,.84,.85,.025);eye(141,61,12,12,surprised?0:2,blink);eye(180,61,12,12,surprised?0:2,blink);
 line(128,46-surprised*3,148,46,'#4b2e30',3);line(172,46,192,46-surprised*3,'#4b2e30',3);
 line(118,61,104,65,'#293e4a',3);rect(97,62,11,8,3,'#ffbd5f','#653a32');line(203,61,216,65,'#293e4a',3);rect(215,62,11,8,3,'#ffbd5f','#653a32');
 poly([[114,80],[207,80],[221,96],[214,125],[106,125],[99,96]],grad(0,79,0,129,[[0,'#ffd578'],[.25,'#ff943b'],[.7,'#e75928'],[1,'#8a322b']]),'#63312b',2);
 poly([[119,82],[202,82],[214,93],[106,93]],'#ffc368');line(123,84,198,84,'#fff0b0',2);
 rect(125,98,70,23,5,'#243f49','#ffbd78',1.5);
 for(let i=0;i<4;i++)line(130,102+i*4,190,102+i*4,'#728b91',1.3);
 for(const x of [114,207]){ellipse(x,103,9,9,'#ffe8a0','#753f34',1.4);ellipse(x,102,6,6,'#fff8dc');ellipse(x-2,100,2,2,'white')}
 // A broad grille-mouth is readable at actual device size.
 c.beginPath();c.moveTo(140,104);c.quadraticCurveTo(160,108+surprised*8,182,104);c.quadraticCurveTo(164,137-surprised*4,140,104);c.fillStyle='#132b39';c.fill();
 c.beginPath();c.moveTo(142,105);c.quadraticCurveTo(161,112,179,105);c.lineTo(175,111);c.quadraticCurveTo(159,117,146,109);c.fillStyle='#fff6da';c.fill();ellipse(162,117,8,2,'#ee8077');
 rect(101,124,118,8,3,grad(0,124,0,132,[[0,'#ebf9ef'],[.45,'#9cbac0'],[1,'#456070']]),'#314957');
 rect(146,126,28,6,2,'#e8f3d7');line(110,136,120,136,'#34464b',3);line(201,136,210,136,'#34464b',3);
 c.globalAlpha=mud;for(let i=0;i<20;i++){const x=110+(i*31)%101,y=83+(i*17)%42;ellipse(x,y,3+(i%4)*1.6,2+i%3,'#785744');ellipse(x+2,y-1,1.5,1,'#ab8655')}c.globalAlpha=1;c.restore();
}
function brush(x,a,left){
 line(x,32,x,135,'#254753',9);rect(x-17,50,34,73,12,'#65315d','#422340',1.5);
 for(let j=0;j<17;j++){const yy=52+j*4.1;for(let i=0;i<5;i++){const ang=a*5+i*TAU/5+j*.45,xx=Math.sin(ang)*19;line(x,yy,x+xx,yy+Math.cos(ang)*4,Math.cos(ang)>0?'#ff89b0':'#bc3d7e',3.5)}}
 ellipse(x,48,18,6,'#ffb0c9','#81355f',1);ellipse(x,127,17,5,'#713154');
}
function wash(p,a){
 c.fillStyle=grad(0,0,0,160,[[0,'#09273f'],[.55,'#226481'],[1,'#113c52']]);c.fillRect(0,0,320,160);
 for(let i=0;i<8;i++){line(i*45-15,0,i*45+35,130,'#70c6d010',12)}
 c.fillStyle='#244d60';c.fillRect(0,130,320,30);for(let i=0;i<6;i++)line(0,135+i*6,320,135+i*6,'#51939b44',1);for(let i=0;i<9;i++)line(160,125,i*50-40,160,'#8db5b333',1);
 rect(35,5,250,136,12,'#284e63','#7ac2c9',2);rect(49,23,222,113,4,'#143b54');
 for(let x=60;x<267;x+=29)rect(x,12,18,5,2,'#a4ffe9');
 rect(53,25,7,97,3,'#56b9c6');rect(260,25,7,97,3,'#56b9c6');
 // Moving overhead water jets frame the character without hiding its eyes.
 const washing=pulse(p,.05,.54,.09),clean=pulse(p,.5,.91,.06);
 for(let i=0;i<14;i++){const x=67+i*14,yy=30+((p*390+i*19)%87);c.globalAlpha=.15+.6*washing;line(x,yy,x-3,yy+7,'#bdfbff',1.4)}c.globalAlpha=1;
 truck(a,1-clean,Math.sin(a*2)*.5+.5);
 const approach=Math.sin(a/2)**2;brush(76+approach*22,a,true);brush(245-approach*22,-a,false);
 // Broad soap wipe: it grows over the truck, then lifts away to reveal clean paint.
 const foam=pulse(p,.19,.46,.14);
 if(foam>0){c.save();c.globalAlpha=clamp(foam*2);for(let row=0;row<5;row++)for(let i=0;i<12;i++){
  const x=i*29-5+Math.sin(a*2+row)*6,y=160-row*25*foam+Math.sin(i*1.7+row+a)*5;
  bubble(x,y,15+(i+row)%3*4,.93);
 }c.restore();}
 // Floating suds and sparkling droplets span the whole screen.
 for(let i=0;i<12;i++){const q=(p+i*.0833)%1,x=13+(i*73)%299,y=158-q*130; bubble(x+Math.sin(q*TAU+i)*9,y,2+i%4,.25+.45*Math.sin(q*Math.PI))}
 if(clean>0){c.globalAlpha=clean;for(let i=0;i<5;i++){const s=3+Math.sin(a*5+i)*2;star(101+i*28,83+(i%2)*43,s,'#fff7b8',a*.4)}c.globalAlpha=1;}
 // A playful final splash returns the truck to its starting muddy state.
 const splash=pulse(p,.84,.91,.05);if(splash>0){c.globalAlpha=splash;for(let i=0;i<9;i++)ellipse(106+i*13,126-Math.sin(i*.8+a)*15,8,4+i%3,'#896044');c.globalAlpha=1;}
}
function wrench(x,y,angle,scale=1){c.save();c.translate(x,y);c.rotate(angle);c.scale(scale,scale);line(0,0,0,-20,'#203949',7);line(-1,0,-1,-20,'#b9d8df',4);ellipse(0,-23,6,6,'#d4e9e9');poly([[-3,-29],[0,-23],[3,-29]],'#21354c');ellipse(0,1,3,3,'#7aabbf','#e2f4eb');c.restore()}
function engine(a,lift){
 c.save();c.translate(226+Math.sin(a*8)*(1+lift),111-lift*45);c.rotate(Math.sin(a*5)*(.025+lift*.04));
 // Blue-hot exhaust is visibly larger during the little launch.
 for(const x of [-32,32]){const len=6+lift*24+Math.sin(a*9+x)*3;poly([[x-7,13],[x-5,22],[x-9,len+21],[x,18+len*.7],[x+3,26+len],[x+7,14]],'#48c8ef');poly([[x-3,15],[x,18+len],[x+4,16]],'#e5fff4');}
 rect(-34,-20,69,31,5,grad(0,-25,0,18,[[0,'#bac7d7'],[.3,'#79859f'],[1,'#394b67']]),'#102c42',2);
 for(let side=-1;side<=1;side+=2){c.save();c.translate(side*23,-23);c.rotate(side*.48);rect(-11,-10,22,26,4,'#a94c66','#302e4b',2);line(-7,-7,7,-7,'#ffb9a0',2);for(let j=0;j<3;j++)line(-8,-2+j*6,8,-2+j*6,'#ef8591',2);c.restore();}
 for(let i=0;i<3;i++){const x=-19+i*19,yy=-35-Math.sin(a*4+i*2)*7;line(x,-12,x,yy,'#c4dfeb',4);rect(x-6,yy-7,12,10,2,grad(0,yy-7,0,yy+3,[[0,'#f0f4df'],[1,'#88a2b2']]),'#29475b');line(x-5,yy-4,x+5,yy-4,'#547b93',1)}
 rect(-27,-22,54,13,4,'#d3ad53','#514154',1.5);for(let i=0;i<6;i++)line(-21+i*8,-19,-21+i*8,-12,'#685346',2);
 ellipse(0,5,14,14,'#122d43','#93bec9',2);for(let i=0;i<5;i++){const q=a*7+i*TAU/5;line(Math.cos(q)*3,5+Math.sin(q)*3,Math.cos(q)*11,5+Math.sin(q)*11,'#b3e3da',3)}ellipse(0,5,4,4,'#ffcf69');
 for(const side of [-1,1]){line(side*29,-3,side*41,5,'#90b1c0',6);line(side*41,5,side*41,16,'#c6e0e1',6);ellipse(side*41,17,4,2,'#183648')}
 c.restore();
}
function alien(p,a){
 c.fillStyle=grad(0,0,320,160,[[0,'#142243'],[.55,'#272449'],[1,'#51315a']]);c.fillRect(0,0,320,160);
 // A starry porthole, tidy tool rack and small diagnostics set the space-garage scene.
 ellipse(263,38,43,32,'#0b1834','#7883ad',5);ellipse(263,38,38,27,'#112344','#263550',2);
 for(let i=0;i<11;i++){const x=232+i*7%65,y=18+i*13%39;ellipse(x,y,.7+Math.sin(a+i)*.3,.8,'#bcf0f9')}
 c.save();c.translate(272,36);c.rotate(-.3);ellipse(0,0,15,9,'#78d5c4');ellipse(0,0,23,3,null,'#daa5db',2);c.restore();
 rect(13,15,74,43,5,'#273959','#657594',1);for(let i=0;i<4;i++)wrench(24+i*17,45,.1*(i-1),.6);
 line(0,135,320,135,'#627694',2);c.fillStyle='#192d45';c.fillRect(0,136,320,24);for(let i=0;i<7;i++)line(0,141+i*5,320,141+i*5,'#677b9122');
 rect(179,128,115,12,4,'#789199','#192d49',2);rect(185,140,8,20,2,'#465b72');rect(277,140,8,20,2,'#465b72');
 const lift=pulse(p,.38,.63,.12),shock=pulse(p,.32,.66,.12),bob=Math.sin(a*3)*2;
 ellipse(99,150,43,5,'#091c34');ellipse(221,145,43-lift*12,4,'#071c31');
 // Boots, coveralls, two animated hands and the characteristic oversized head.
 c.save();c.translate(0,bob);line(91,122,84,141,'#417c91',12);line(113,122,122,141,'#417c91',12);rect(70,139,27,10,5,'#eaa251','#51364c',2);rect(114,139,26,10,5,'#eaa251','#51364c',2);
 ellipse(102,107,24,27,grad(80,80,120,135,[[0,'#79cede'],[1,'#327389']]),'#173c55',2);rect(91,103,21,16,3,'#367387','#204458');line(102,86,102,98,'#d3fcda',2);ellipse(102,95,3,3,'#ffce67');
 // Flexible arms reach for a wrench and the engine, then recoil during liftoff.
 const handX=157-shock*19,handY=99-shock*21;line(123,96,143,110-shock*20,'#326b85',12);line(143,110-shock*20,handX,handY,'#8bd18c',9);ellipse(handX,handY,7,6,'#aff49b','#306967');wrench(handX+3,handY-2,-.5+Math.sin(a*3)*.45-shock*.6,.9);
 line(79,96,62,112,'#3d8295',11);line(62,112,55,95-shock*18,'#a4e692',9);ellipse(55,93-shock*18,7,6,'#b8f3a0','#397772');
 c.save();c.translate(Math.sin(a)*3,0);c.rotate(Math.sin(a*2)*.018);
 // Antennae swing; lights pulse without rapid flashing.
 line(81,40,73+Math.sin(a*2)*4,19,'#91cd83',3);line(115,38,125+Math.sin(a*2+1)*4,17,'#91cd83',3);ellipse(73+Math.sin(a*2)*4,17,5,5,'#ffd880');ellipse(125+Math.sin(a*2+1)*4,15,5,5,'#ff9bb0');
 c.beginPath();c.moveTo(58,54);c.bezierCurveTo(53,22,131,20,141,50);c.bezierCurveTo(146,68,119,91,101,93);c.bezierCurveTo(83,91,63,73,58,54);c.fillStyle=grad(70,28,118,96,[[0,'#ddffac'],[.5,'#8ddd87'],[1,'#38a287']]);c.fill();c.strokeStyle='#205d67';c.lineWidth=2;c.stroke();
 ellipse(70,65,8,5,'#94cd77');ellipse(125,65,8,5,'#94cd77');
 for(const [x,ang] of [[80,-.28],[118,.28]]){c.save();c.translate(x,54-shock*2);c.rotate(ang);ellipse(0,0,12,16,'#163046','#c8f8ac',1.2);ellipse(3+shock,0,6,10,'#294d5c');ellipse(1,-6,3.5,5,'#ebffff');ellipse(6,4,1.5,2,'#79d9cc');c.restore();}
 if(shock>.35){ellipse(102,78,6,4+shock*4,'#194455');ellipse(102,81,3,2,'#e98e9e')}else{c.beginPath();c.moveTo(91,76);c.quadraticCurveTo(102,87,113,75);c.quadraticCurveTo(102,79,91,76);c.fillStyle='#214e58';c.fill();line(98,78,106,78,'#effdcc',2)}
 line(74,34,86,32-shock*3,'#43826f',2);line(112,32-shock*3,124,34,'#43826f',2);
 c.restore();c.restore();
 engine(a,lift);
 // Green coolant arcs into droplets; all trajectories repeat exactly at the seam.
 const goo=pulse(p,.19,.49,.1);c.globalAlpha=goo;for(let i=0;i<9;i++){const q=(p*2+i/9)%1,x=188-q*46,y=100-Math.sin(q*Math.PI)*37;ellipse(x,y,2.5,1.8+q,'#b3ff82');}c.globalAlpha=1;
 // A loose nut orbits the rising engine, then drops back onto the workbench.
 c.save();c.translate(266+Math.sin(a)*14,105-lift*44);c.rotate(a*2);poly([[-4,-2],[0,-5],[5,-2],[5,3],[0,5],[-4,2]],'#e4d08e','#4b4860');ellipse(0,0,2,2,'#29364e');c.restore();
 if(shock>.25){c.globalAlpha=shock;star(157,42,5,'#ffe38a',.2);line(154,55,151,61,'#ffe38a',2);c.globalAlpha=1;}
 // Warm work light catches the engine chrome.
 line(303,134,303,66,'#a7a6a5',3);line(303,66,283,56,'#b8c1b9',3);poly([[282,51],[270,57],[280,65],[289,59]],'#f3bf69','#705067');
}
function draw(t){const p=(((t%3.6)+3.6)%3.6)/3.6,a=p*TAU;c.clearRect(0,0,320,160);({wash,alien,demon,dragon,shark,robot,ghost,raccoon})[kind](p,a);out.drawImage(stage,0,0,160,80);const n=document.getElementById('native');if(n)n.getContext('2d').drawImage(canvas,0,0);return canvas.toDataURL('image/png')}
document.title=names[kind]+' · Little Screen Studio';document.getElementById('name').textContent=names[kind];
document.getElementById('description').textContent=({wash:'Big brushes. Bigger bubbles. One very muddy little truck.',alien:'A tiny alien, a very unruly V8, and a wrench that probably voids the warranty.',demon:'Big blower. Chrome pulleys. A garage full of attitude.',dragon:'Please do not sneeze on the glass.',shark:'Your underwater window has a very enthusiastic inspector.',robot:'One small cube for the bin. One giant shove for the robot.',ghost:'The night shift has some spirited mechanics.',raccoon:'Fast paws. Loose lug nuts. A tire with other plans.'})[kind];document.getElementById('download').href='../../packs/'+ids[kind]+'.msupack';
const nav=document.querySelector('nav');nav.replaceChildren();for(const [key,name] of Object.entries(names)){const link=document.createElement('a');link.href='?scene='+key;link.textContent=name;if(key===kind)link.setAttribute('aria-current','page');nav.append(link)}
let paused=false,last=-1;document.getElementById('pause').onclick=()=>{paused=!paused;document.getElementById('pause').textContent=paused?'Play':'Pause'};document.getElementById('scrub').oninput=e=>{paused=true;document.getElementById('pause').textContent='Play';draw(Number(e.target.value)/10)};document.getElementById('pixels').onclick=()=>{canvas.style.imageRendering=canvas.style.imageRendering==='pixelated'?'auto':'pixelated'};
window.renderFrame=draw;window.companionReady=true;draw(0);function tick(ms){const f=Math.floor(ms/100)%36;if(!paused&&f!==last){draw(f/10);document.getElementById('scrub').value=f;last=f}requestAnimationFrame(tick)}requestAnimationFrame(tick);
