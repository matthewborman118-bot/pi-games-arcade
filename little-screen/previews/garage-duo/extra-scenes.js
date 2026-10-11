// Six additional original scenes. Shared primitives are provided by animation.js.
function textLabel(text,x,y,size,color){c.fillStyle=color;c.font=`900 ${size}px system-ui`;c.textAlign='center';c.fillText(text,x,y)}
function smoke(x,y,r,color,alpha=1){c.save();c.globalAlpha=alpha;for(let j=0;j<5;j++)ellipse(x+Math.sin(j*2.1)*r*.7,y+Math.cos(j*1.7)*r*.4,r*(.65+j*.08),r*.6,color);c.restore()}
function flame(x,y,a,size=1){c.save();c.translate(x,y);c.scale(size,size);poly([[-9,0],[-15,-14],[-7,-10],[-12,-30-Math.sin(a)*7],[-1,-18],[4,-43-Math.cos(a)*9],[10,-20],[14,-24],[10,0]],'#ff7136');poly([[-5,0],[-6,-12],[1,-8],[4,-29],[9,-13],[6,0]],'#ffe67f');poly([[0,0],[2,-14],[6,0]],'#fff9cb');c.restore()}
function tire(x,y,r,ang){ellipse(x,y,r,r,'#101d2b','#061726',1.5);ellipse(x,y,r*.74,r*.74,'#42586c','#93b3c2',1);ellipse(x,y,r*.55,r*.55,'#172f44');for(let i=0;i<6;i++){const q=ang+i*TAU/6;line(x+Math.cos(q)*r*.17,y+Math.sin(q)*r*.17,x+Math.cos(q)*r*.6,y+Math.sin(q)*r*.6,'#d0e3dd',r*.12)}ellipse(x,y,r*.16,r*.16,'#f6ce73');for(let i=0;i<12;i++){const q=ang+i*TAU/12;line(x+Math.cos(q)*r*.89,y+Math.sin(q)*r*.89,x+Math.cos(q+.06)*r*.99,y+Math.sin(q+.06)*r*.99,'#3a4c5c',1.6)}}
function garageBackground(a,purple=false){c.fillStyle=grad(0,0,0,160,[[0,purple?'#171331':'#071d30'],[1,purple?'#40365a':'#26485c']]);c.fillRect(0,0,320,160);for(let i=0;i<7;i++)line(22+i*46,0,22+i*46,121,purple?'#684d752d':'#739ab328',2);rect(38,8,244,117,8,purple?'#1c1c3b':'#102b3c',purple?'#7a7597':'#527c88',3);for(let i=0;i<6;i++)line(44,25+i*16,276,25+i*16,'#8699ac1d',1);line(50,14,270,14,purple?'#c298e2':'#75e8e4',3);c.fillStyle=purple?'#29253d':'#163142';c.fillRect(0,125,320,35);for(let i=0;i<7;i++)line(160,119,i*63-20,160,'#89adc322');line(0,140,320,140,'#a2b3c32b');ellipse(160,141,100,7,'#090f2499')}
function muscle(a,{purple=false,assembly=1,blower=true,rev=0}={}){
 const drop=(1-assembly)*34;c.save();c.translate(160,90+Math.sin(a*5)*(1+rev)*.9);c.scale(1+rev*.035,1+rev*.035);
 const body=purple?['#f4a3ff','#a56add','#633d91']:['#ffbd86','#e8493d','#8f2435'];
 for(const s of [-1,1]){c.save();c.translate(s*(73+(1-assembly)*40),31-drop);c.rotate(s*(1-assembly)*1.4);rect(-10,-18,20,40,7,'#112434','#071522',2);for(let i=0;i<5;i++)line(-8,-13+i*7,8,-13+i*7,'#385360',2);c.restore()}
 // Wide roof and low shoulder line distinguish the muscle car from the pickup.
 poly([[-63,-17],[-49,-45],[43,-45],[59,-17]],grad(0,-45,0,-16,[[0,body[0]],[.4,body[1]],[1,body[2]]]),'#302335',2);
 poly([[-51,-19],[-42,-38],[36,-38],[48,-19]],'#152c40','#ecb7bf',1);poly([[-39,-35],[-4,-35],[-27,-21],[-48,-21]],'#496e85');line(3,-35,3,-21,'#758ea3',1);
 c.save();c.translate(0,-drop);poly([[-67,-14],[-87,7],[-79,34],[78,34],[88,7],[62,-14]],grad(0,-14,0,38,[[0,body[0]],[.24,body[1]],[1,body[2]]]),'#3d2737',2);
 poly([[-59,-11],[56,-11],[76,2],[-76,2]],body[0]);line(-54,-8,52,-8,'#ffe6ce',1.4);poly([[-21,-13],[-11,-13],[-15,1],[-27,1]],'#292d42');poly([[12,-13],[22,-13],[28,1],[17,1]],'#292d42');c.restore();
 rect(-78,6,155,22,4,'#132437','#efb5bc',1.5);for(let i=0;i<5;i++)line(-29,9+i*3,29,9+i*3,'#8791a2',1);
 for(const x of [-63,-43,43,63]){ellipse(x,16,8,7,purple?'#bdffdb':'#ffe6aa','#8b6976',1);ellipse(x,15,5.5,4.5,'#fffbe2');line(x-6,11,x+5,12,purple?'#52634c':'#6d3b44',2)}
 rect(-80,31,159,7,2,grad(0,31,0,38,[[0,'#f7e8dc'],[.4,'#a4b6c2'],[1,'#3e526d']]),'#213242');textLabel('DODGE',0,27,7,'#fff1d1');
 if(blower){c.save();c.translate(Math.sin(a*9)*rev,Math.sin(a*8)*rev);
 rect(-25,-27,50,23,4,'#536b80','#1b273d',2);for(let i=0;i<8;i++)line(-21+i*6,-24,-21+i*6,-8,'#acbbc4',1.7);
 rect(-34,-44,68,21,6,grad(0,-44,0,-23,[[0,'#fff3cc'],[.32,'#b8ccd2'],[1,'#58728e']]),'#253148',2);
 for(const x of [-21,0,21]){ellipse(x,-33,8,7,'#152638','#647f92',1);ellipse(x,-33,6,4,'#3c242e');line(x-5,-34,x+5,-32,'#f6a76e',2)}
 ellipse(0,-3,9,9,'#132c41','#bac8c9',2);for(let i=0;i<3;i++){const q=a*8+i*TAU/3;line(0,-3,Math.cos(q)*6,-3+Math.sin(q)*6,'#e4eff0',2)}c.restore()}
 c.restore();
}
function demon(p,a){garageBackground(a);const rev=pulse(p,.2,.7,.15);textLabel('SUPERCHARGED',160,31,11,'#81d1d9');
 for(let i=0;i<9;i++){const q=(p+i/9)%1;smoke(i%2?275-q*15:45+q*15,139-q*36,10+q*12,'#90a4af',Math.sin(q*Math.PI)*.3)}
 for(const x of [46,274])flame(x,140,a*7+x,.4+rev*.6);muscle(a,{rev});
 for(let i=0;i<7;i++){const q=(p*2+i/7)%1;line(39+q*30,142+q*7,35+q*30,143+q*7,'#ffe898',1);line(282-q*30,142+q*7,287-q*30,143+q*7,'#ffa366',1)}
}
function dragon(p,a){
 c.fillStyle=grad(0,0,320,160,[[0,'#163544'],[.6,'#285653'],[1,'#557a64']]);c.fillRect(0,0,320,160);for(let row=0;row<5;row++)for(let i=0;i<7;i++)rect(i*55-(row%2)*25,row*32,52,29,4,'#95af8720');
 for(const x of [27,293]){rect(x-4,69,8,38,2,'#8a6747');flame(x,73,a*3+x,.38)}ellipse(163,147,76,6,'#153739');
 const press=pulse(p,.14,.42,.12),sneeze=pulse(p,.46,.53,.06),wipe=pulse(p,.71,.87,.08);
 // Tail snakes across the left; small wings beat behind the friendly round body.
 c.beginPath();c.moveTo(137,121);c.bezierCurveTo(97,152,61,147,47,113+Math.sin(a*2)*10);c.bezierCurveTo(79,137,92,124,129,105);c.fillStyle='#d8733f';c.fill();c.strokeStyle='#633d3c';c.lineWidth=2;c.stroke();
 for(let i=0;i<5;i++)poly([[66+i*12,129],[71+i*12,117+Math.sin(i)*4],[77+i*12,131]],'#f6c35e');
 for(const side of [-1,1]){c.save();c.translate(160+side*26,88);c.scale(side,1);const flap=Math.sin(a*3)*7;c.beginPath();c.moveTo(0,0);c.lineTo(37,-34-flap);c.quadraticCurveTo(47,-9,43,20);c.quadraticCurveTo(32,4,21,21);c.quadraticCurveTo(15,7,0,22);c.closePath();c.fillStyle='#bf6264';c.fill();c.strokeStyle='#673d4a';c.lineWidth=2;c.stroke();line(2,1,37,-32-flap,'#ffb778',2);line(37,-32-flap,22,19,'#e99b7a',1.5);c.restore()}
 ellipse(161,117,33,29,grad(130,100,187,140,[[0,'#ffa95c'],[1,'#ce6839']]),'#674544',2);ellipse(163,123,19,22,'#ffdf8d');for(let i=0;i<3;i++)line(149,116+i*9,177,116+i*9,'#e9aa66',1);
 ellipse(131,142,15,7,'#d47b48','#654743');ellipse(192,142,15,7,'#d47b48','#654743');for(const x of [125,134,186,195])line(x,143,x+1,146,'#fff1c5',2);
 c.save();c.translate(162,65+Math.sin(a*2)*2);c.scale(1+press*.14,1+press*.08);
 poly([[-24,-21],[-26,-43],[-10,-27]],'#ffe1a1','#705343',1.5);poly([[18,-26],[32,-43],[31,-15]],'#ffe1a1','#705343',1.5);
 ellipse(0,0,37,32,grad(-25,-29,25,33,[[0,'#ffcb78'],[.5,'#eb9a4a'],[1,'#cc663e']]),'#75483e',2);
 const blink=pulse(p,.39,.405,.035);eye(-15,-7,10,13,press*1.5,blink);eye(15,-7,10,13,-press*1.5,blink);
 ellipse(0,17,29+press*5,15-press*3,'#ffc078','#925942',1.5);ellipse(-11,13,3+press,2,'#966241');ellipse(11,13,3+press,2,'#966241');
 c.beginPath();c.moveTo(-17,23);c.quadraticCurveTo(0,31+sneeze*5,18,22);c.strokeStyle='#754237';c.lineWidth=2;c.stroke();poly([[-14,25],[-8,27],[-11,32]],'#fff6c7');poly([[10,27],[16,25],[13,31]],'#fff6c7');c.restore();
 // Palm pads touch the glass, followed by a clear wiping sweep.
 const handX=117+wipe*103,handY=102-wipe*19;line(138,111,handX,handY,'#d68046',12);ellipse(handX,handY,12,10,'#ffc57c','#80513c',1.4);for(let i=0;i<3;i++)ellipse(handX-8+i*7,handY-8,3,4,'#ffdda1');ellipse(207,105,12,10,'#ffc57c','#80513c',1.4);
 if(press>.1){c.globalAlpha=press*.45;ellipse(160,83,49,34,null,'#d2ffe2',1);line(103,70,97,65,'#e1ffeb',2);line(219,70,225,65,'#e1ffeb',2);c.globalAlpha=1}
 if(sneeze>0){c.save();c.translate(163,93);c.rotate(Math.PI);flame(0,0,a*11,sneeze*2.5);c.restore();}
 const soot=pulse(p,.54,.76,.065);if(soot>0){c.save();c.beginPath();c.rect(75+wipe*180,0,245-wipe*180,160);c.clip();smoke(158,82,45,'#172d2b',soot*.87);for(let i=0;i<8;i++)ellipse(107+(i*41)%106,35+(i*19)%84,3,2,'#344333');c.restore();}
 // Glass edge highlights reinforce the pressed-against-the-screen illusion.
 line(6,7,6,48,'#c8ffe43b',2);line(6,7,41,7,'#c8ffe43b',2);line(310,112,310,151,'#c8ffe43b',2);
}
function smallFish(x,y,s,color,direction=1){c.save();c.translate(x,y);c.scale(direction*s,s);poly([[-8,0],[-15,-5],[-15,5]],color);ellipse(0,0,10,5,color);ellipse(5,-1,1.5,1.5,'#132b42');c.restore()}
function shark(p,a){
 c.fillStyle=grad(0,0,0,160,[[0,'#0c738c'],[.45,'#075071'],[1,'#102c4d']]);c.fillRect(0,0,320,160);
 for(let i=0;i<5;i++){c.save();c.globalAlpha=.07;c.fillStyle='#b7ffec';poly([[i*75-15,0],[i*75+2,0],[i*75+92+Math.sin(a)*7,160],[i*75+34,160]],'#b7ffec');c.restore()}
 c.fillStyle='#c4bc8c';c.beginPath();c.moveTo(0,154);c.quadraticCurveTo(120,135,320,151);c.lineTo(320,160);c.lineTo(0,160);c.fill();
 for(let i=0;i<9;i++){const x=i*39+8;line(x,155,x+Math.sin(a*2+i)*7,130-i%3*5,i%2?'#68af95':'#4b9693',3);ellipse(x,156,9,3,'#8fa6a0')}
 const face=pulse(p,.28,.66,.18),x=160+Math.sin(a)*16,yy=78+Math.sin(a*2)*4;
 for(let i=0;i<6;i++){const flee=face*42;smallFish((i*67+40+Math.sin(a+i)*13+(i%2?flee:-flee)+360)%360-20,30+i%3*48,.6,i%2?'#ffce74':'#f1a1a0',i%2?1:-1)}
 c.save();c.translate(x,yy);ellipse(0,66,65,4,'#25495c33');
 // Tail and fins fold behind the head as it turns toward the glass.
 const tailX=-77+face*49;poly([[tailX+19,0],[tailX-23,-29+Math.sin(a*3)*8],[tailX-16,0],[tailX-26,27+Math.sin(a*3)*8]],'#4392b5','#185775',1.5);
 poly([[-15,-14],[-4,-50],[22,-18]],'#519cbd','#225772',1.5);
 poly([[3,18],[-19,46-face*8],[31,25]],'#286f98','#1e4f76',1.4);poly([[28,13],[74+face*8,38],[57,2]],'#4c9dbe','#215979',1.5);
 ellipse(0,0,68-face*15,30+face*18,grad(0,-45,0,48,[[0,'#91d8dd'],[.35,'#55a7c7'],[.6,'#3284af'],[.64,'#d2e9d7'],[1,'#f2f1d4']]),'#1c5c7b',2);
 const leftEye=32-face*59,rightEye=48-face*20;eye(leftEye,-10-face*6,5+face*5,7+face*6,1-face);eye(rightEye,-10-face*6,5+face*5,7+face*6,-face);
 const mouthX=40*(1-face);c.beginPath();c.moveTo(mouthX-19-face*9,10);c.quadraticCurveTo(mouthX,15,mouthX+19+face*9,10);c.quadraticCurveTo(mouthX,48+face*5,mouthX-19-face*9,10);c.fillStyle='#194058';c.fill();
 for(let i=0;i<6;i++){const xx=mouthX-17-face*6+i*(6+face*2.4);poly([[xx,13],[xx+5,13],[xx+2.5,20]],'#fffce3')}ellipse(mouthX,28+face*3,10+face*5,3,'#ee939d');
 for(let i=0;i<3;i++)line(-34+i*6,-2,-37+i*6,10,'#24658b',1.5);
 if(face>.2){c.globalAlpha=face;ellipse(-9,2,2,1.5,'#276b8e');ellipse(9,2,2,1.5,'#276b8e');ellipse(0,3,29,9,null,'#b6e6e0',1);c.globalAlpha=1}c.restore();
 for(let i=0;i<9;i++){const q=(p+i/9)%1;ellipse(17+i*37%300,159-q*148,1+i%3,1+i%3,null,'#b4ece97a',.8)}
 if(face>.3){c.globalAlpha=face*.5;ellipse(x,yy+4,65,53,null,'#c8f9e8',1);c.globalAlpha=1}
}
function junk(x,y,size,angle,cube=false){c.save();c.translate(x,y);c.rotate(angle);c.scale(size,size);if(cube){poly([[-8,-7],[5,-7],[10,-3],[-3,-3]],'#fae393');poly([[-8,-7],[-3,-3],[-3,9],[-8,4]],'#6b93a4');poly([[-3,-3],[10,-3],[10,9],[-3,9]],'#a1d7cb','#263d5e');for(let i=0;i<3;i++)line(-1,i*3,8,i*3,'#547c8c',1)}else{rect(-7,-6,14,12,2,'#a4bac3','#294664',1.3);line(-4,-7,4,-7,'#e6e0a5',2);line(-4,-1,4,-1,'#516b8b',2);poly([[5,-3],[13,0],[6,3]],'#d5aa68')}c.restore()}
function robot(p,a){
 c.fillStyle=grad(0,0,320,160,[[0,'#071a35'],[.6,'#1f254b'],[1,'#374260']]);c.fillRect(0,0,320,160);for(let i=0;i<38;i++)ellipse(i*67%320,i*41%160,.5+i%3*.3,.6,'#d9f3e5');
 ellipse(25,164,75,65,'#3d859e','#8ac9c9',3);c.save();c.beginPath();c.ellipse(25,164,73,63,0,0,TAU);c.clip();poly([[-10,109],[22,114],[40,136],[22,148],[15,169],[-6,157]],'#84ba93');poly([[65,140],[86,148],[60,174],[47,162]],'#77b49b');line(-23,130,70,121,'#d5eece88',4);c.restore();
 const grab=pulse(p,.12,.36,.12),crush=pulse(p,.37,.55,.08),launch=pulse(p,.61,.78,.08),recoil=Math.sin(pulse(p,.63,.83,.08)*Math.PI*.75)*20;
 const x=182-recoil,y=83+Math.sin(a)*5;c.save();c.translate(x,y);c.rotate(Math.sin(a)*.04-launch*.08);
 // Articulated collection arm on the right, with a claw that visibly closes.
 const hx=83-grab*73,hy=-7+grab*20;line(29,18,59,35,'#657f9f',9);line(59,35,hx,hy,'#bacbca',7);ellipse(59,35,6,6,'#f2bf68','#5a526c');
 line(hx,hy,hx+12,hy-9+grab*5,'#b8d9db',3);line(hx,hy,hx+12,hy+9-grab*5,'#b8d9db',3);line(hx+12,hy-9+grab*5,hx+16,hy-4,'#e8edcb',2);line(hx+12,hy+9-grab*5,hx+16,hy+4,'#e8edcb',2);
 junk(hx+11,hy,1-grab*.25,a*2);line(-30,16,-48,32+Math.sin(a*2)*8,'#779cb1',8);ellipse(-51,34+Math.sin(a*2)*8,8,7,'#e7c273','#4a5873');
 for(const side of [-1,1]){rect(side*24-7,43,14,14,3,'#739cb4','#233c59');c.save();c.translate(side*24,57);c.rotate(Math.PI);flame(0,0,a*5+side,.3+launch*.4);c.restore()}
 rect(-37,-5,74,55,12,grad(-30,0,30,49,[[0,'#ffe4a0'],[.5,'#e9ac5b'],[1,'#bd7351']]),'#3e3e58',2);
 rect(-26,14,52,25,4,'#213750','#f1d499',2);rect(-20,17,40,6+crush*12,2,'#81999f');line(-17,20+crush*12,17,20+crush*12,'#dfe5c8',2);if(crush>.1)junk(0,32,1-crush*.4,0,true);
 rect(-33,-46,66,44,11,grad(0,-46,0,-2,[[0,'#afd3cc'],[1,'#678aa4']]),'#263b58',2);rect(-26,-39,52,29,7,'#12374b','#d7ecce',1);
 const eyes=1-pulse(p,.49,.505,.03);for(const xx of [-12,12])ellipse(xx,-25,5,6*eyes+.5,'#a6ffcb');line(-7,-16,7,-16,'#79e6c4',2);line(0,-47,0,-58,'#a2c9cb',2);ellipse(0,-61,4,4,'#ffa5a5');
 rect(-14,42,28,5,2,'#52728a');c.restore();
 // A compressed cube launches rightward and the robot recoils left.
 const q=ease((p-.59)/.25),visible=pulse(p,.57,.85,.06);if(visible>0){c.globalAlpha=visible;junk(182+q*147,115-q*48,1+q*.3,a*4,true);for(let j=0;j<3;j++)line(179+q*147-j*7,117-q*48,169+q*147-j*7,119-q*48,'#b0efd6',1.2);c.globalAlpha=1}
 junk(79+Math.sin(a)*8,41+Math.cos(a)*5,.6,-a);junk(288+Math.sin(a+1)*7,137,.55,a);
}
function ghostFigure(x,y,a,flip=1){c.save();c.translate(x,y);c.scale(flip,1);c.beginPath();c.moveTo(-17,7);c.bezierCurveTo(-25,-34,23,-37,20,0);c.lineTo(24,22);c.quadraticCurveTo(15,11,9,24);c.quadraticCurveTo(2,11,-5,23);c.quadraticCurveTo(-12,13,-20,23);c.closePath();c.fillStyle='#9fe9cd';c.fill();c.strokeStyle='#d4ffe1';c.lineWidth=1.3;c.stroke();ellipse(-5,-9,4,7,'#22475e');ellipse(9,-9,4,7,'#22475e');ellipse(3,5,4,5,'#42887e');line(15,3,29,10+Math.sin(a)*4,'#b8f5d7',7);wrench(31,12+Math.sin(a)*4,.7+Math.sin(a)*.2,.65);c.restore()}
function ghost(p,a){garageBackground(a,true);textLabel('MIDNIGHT GARAGE',160,31,10,'#d0abe8');
 const built=pulse(p,.09,.79,.16),vanish=pulse(p,.78,.94,.08);
 ghostFigure(46+Math.sin(a)*7,66+Math.sin(a*2)*8,a);ghostFigure(275+Math.cos(a)*7,67+Math.sin(a*2+1)*8,-a,-1);
 c.save();c.globalAlpha=.35+built*.65;c.translate(0,(1-built)*8);muscle(a,{purple:true,assembly:built,blower:false,rev:pulse(p,.58,.74,.07)});c.restore();
 // Silver engine block levitates into the hood; both ghosts cast little green trails.
 const lev=1-built;if(lev>.001){c.save();c.globalAlpha=lev;c.translate(160,63-lev*30);c.rotate(lev*.6);rect(-15,-7,30,17,3,'#9fbfc3','#3e4264',1.5);for(let i=0;i<4;i++)line(-10+i*7,-3,-10+i*7,7,'#e2e5bc',1.5);c.restore()}
 for(let i=0;i<9;i++){const q=(p*1.5+i/9)%1;star(62+q*185,78-Math.sin(q*Math.PI)*20,1.5+Math.sin(q*Math.PI),i%2?'#a7fbd1':'#d5b0ee',a)}
 if(vanish>0){for(let i=0;i<6;i++)smoke(43+i*48,131-vanish*34+Math.sin(a+i)*8,20+vanish*17,i%2?'#9878bd':'#716294',vanish*.92)}
}
function raccoonHead(x,y,a,scale=1,shock=0){c.save();c.translate(x,y);c.scale(scale,scale);for(const s of [-1,1]){ellipse(s*17,-20,10,11,'#8895a3','#283951',2);ellipse(s*17,-20,5,6,'#e6bda9')}
 ellipse(0,0,28,24,grad(0,-24,0,24,[[0,'#c1c9cb'],[.45,'#8e9eab'],[1,'#d9d9ca']]),'#33465b',1.6);
 for(const s of [-1,1]){c.save();c.translate(s*12,-1);c.rotate(s*.18);ellipse(0,0,13,10,'#26394b');eye(0,-1,6,7,shock?s:1);c.restore()}
 ellipse(0,12,12,9,'#ede9d2');ellipse(0,8,5,3,'#283443');if(shock>.3)ellipse(0,18,3,4,'#33485a');else{c.beginPath();c.moveTo(-7,16);c.quadraticCurveTo(0,21,7,15);c.strokeStyle='#33485a';c.lineWidth=1.5;c.stroke()}
 poly([[-7,-23],[0,-29],[4,-24],[10,-28],[13,-20]],'#9baab5');c.restore()}
function raccoon(p,a){
 c.fillStyle=grad(0,0,0,160,[[0,'#456177'],[1,'#b1b2a0']]);c.fillRect(0,0,320,160);for(let i=0;i<6;i++)rect(i*63-15,0,60,106,2,'#ccd8c418');
 rect(7,9,86,28,4,'#223e53','#b9c6ad',1.5);textLabel('PIT CREW',50,28,13,'#ffd881');c.fillStyle='#776f65';c.fillRect(0,132,320,28);for(let i=0;i<10;i++)rect(i*36,150,19,3,1,'#c4bba455');
 const escape=pulse(p,.63,.86,.1),q=ease((p-.62)/.28),reset=1-ease((p-.91)/.09),jack=pulse(p,.08,.55,.12);
 // A cropped blue race car gives the tire change a clear setting.
 c.save();c.translate(0,-jack*6);poly([[-10,79],[33,70],[57,44],[101,44],[132,79],[150,87],[146,120],[-10,120]],'#4e9dbe','#24425a',2);poly([[49,70],[65,49],[96,49],[113,73]],'#1c3d55');line(64,51,96,51,'#9dd9df',2);poly([[-10,83],[139,83],[141,92],[-10,92]],'#f2de9a');ellipse(111,114,25,25,'#253448');ellipse(110,114,9,9,'#768ea1');ellipse(12,116,22,22,'#162c3a');ellipse(12,116,12,12,'#9eb8be');rect(133,93,12,8,2,'#ffe6a3');c.restore();
 // Mechanic on the right: ringed tail, coveralls, and a working jack handle.
 const bx=237,by=91+Math.sin(a*3)*1.5;
 c.save();c.translate(bx,by);c.save();c.translate(20,32);c.rotate(-.7+Math.sin(a)*.13);ellipse(0,0,11,27,'#a6afb0','#425364',1);for(let i=0;i<4;i++)rect(-9,-20+i*12,18,5,2,'#415368');c.restore();
 ellipse(0,27,20,24,'#c98555','#573e46',1.7);rect(-12,22,24,19,4,'#405d72');line(-12,9,-8,25,'#405d72',5);line(12,9,8,25,'#405d72',5);ellipse(-13,51,11,5,'#2f4051');ellipse(14,51,11,5,'#2f4051');raccoonHead(0,-5,a,1,escape);
 const hy=32+Math.sin(a*4)*9;line(-19,23,-38,hy,'#9babae',8);ellipse(-39,hy,6,5,'#d2d5c5');line(-39,hy,-63,53,'#c4c9b6',3);c.restore();
 poly([[159,145],[181,125],[192,145]],'#d45c51','#523b47',1.5);line(164,139,188,139,'#f2a46f',2);
 // The second raccoon is carried by a rotating wheel, then hops free before it rolls off.
 const tx=135+q*195,ty=119-Math.sin(q*Math.PI)*8;
 c.save();c.globalAlpha=1-ease((p-.87)/.08);tire(tx,ty,29,a*3+q*8);c.globalAlpha=ease((p-.9)/.1);tire(135,119,29,a*3);c.restore();
 const tumble=pulse(p,.12,.53,.1),spin=ease((p-.1)/.43)*TAU;
 c.save();c.translate(137,99);c.rotate(spin);ellipse(0,10,14,18,'#82a99b','#3b5261');line(-12,7,-25,20,'#b9c5bd',7);line(12,7,25,20,'#b9c5bd',7);raccoonHead(0,-12,a,.77,tumble);c.restore();
 if(escape>.3){c.globalAlpha=escape;line(278,61,278,70,'#fff0ad',3);ellipse(278,76,2,2,'#fff0ad');c.globalAlpha=1}
 for(let i=0;i<4;i++){const dust=q*reset;smoke(137+i*19+q*40,144,3+dust*7,'#d3c5a4',dust*.25)}
}
