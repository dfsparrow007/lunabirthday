const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
/* ---------- YOUR FILE NAMES (inside the assets folder) ----------
   Write each name exactly as your file is called, with its extension,
   e.g. "luna 1.png" or "IMG_2041.jpeg". Capital letters matter. If the extension is wrong (jpeg/png/jpg/webp),
   the site tries the other ones automatically. */
const FILES={
 memories:["memory1.jpeg","memory2.jpeg","memory3.jpeg","memory4.jpeg"],
 couple:"couple-special.jpg",
 poster:"video-poster.jpg",
 video:"birthday-video.mp4"};
/* ----------------------------------------------------------- */
/* ---------- edit these ---------- */
const TEASERS=["10... for the day we met","9... for the first time you made me laugh","8... for every text I wait for","7... for how you sing off key","6... for the way you say my name","5... for every laugh we share","4... for the nights that ran too long","3... for the plans we keep making","2... for you, exactly as you are","1... for the best year ahead of you","Happy Birthday, Luna"];
const NOTES=["Wishing you a year as lovely as you are.","May every wish you made today come true.","Today the whole world should be celebrating you.","Here is to more laughter, more cake, more you.","May this year be your softest and your brightest.","Happy Birthday, Luna. Today is all yours."];
const WHEEL=[
 {t:"Movie date",img:"wheel-movie.jpg",m:"Blankets, snacks, and you picking the film."},
 {t:"Cuddle",img:"wheel-cuddle.jpg",m:"No plans. Just you, me, and nowhere to be."},
 {t:"Lunch",img:"wheel-lunch.jpg",m:"Your favorite table is booked. I am buying."},
 {t:"Dare",img:"wheel-dare.jpg",m:"Brave face on. I choose the dare, you choose the revenge."},
 {t:"Couples trip",img:"wheel-trip.jpg",m:"Pack a bag. Somewhere with you in it."}];
/* -------------------------------- */
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
let done=false;
/* particles */
const bg=$("#bg"),bx=bg.getContext("2d"),cf=$("#confetti"),cx=cf.getContext("2d");
function size(){[bg,cf].forEach(c=>{c.width=innerWidth;c.height=innerHeight})}size();addEventListener("resize",size);
const floats=Array.from({length:reduce?0:22},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,s:6+Math.random()*10,v:.2+Math.random()*.4,h:Math.random()<.7}));
function heart(c,x,y,s){c.beginPath();c.moveTo(x,y+s/4);c.bezierCurveTo(x,y-s/3,x-s,y-s/3,x-s,y+s/4);c.bezierCurveTo(x-s,y+s*.8,x,y+s,x,y+s*1.3);c.bezierCurveTo(x,y+s,x+s,y+s*.8,x+s,y+s/4);c.bezierCurveTo(x+s,y-s/3,x,y-s/3,x,y+s/4);c.fill()}
let bits=[];
function loop(){bx.clearRect(0,0,bg.width,bg.height);
 floats.forEach(p=>{p.y-=p.v;if(p.y<-20){p.y=innerHeight+20;p.x=Math.random()*innerWidth}
  bx.fillStyle=p.h?"rgba(244,194,194,.7)":"rgba(212,175,55,.55)";
  if(p.h)heart(bx,p.x,p.y,p.s);else{bx.fillRect(p.x,p.y,3,3)}});
 cx.clearRect(0,0,cf.width,cf.height);
 bits=bits.filter(b=>b.y<cf.height+20);
 bits.forEach(b=>{b.vy+=.12;b.x+=b.vx;b.y+=b.vy;b.a+=b.va;cx.save();cx.translate(b.x,b.y);cx.rotate(b.a);cx.fillStyle=b.c;cx.fillRect(-4,-2,8,4);cx.restore()});
 requestAnimationFrame(loop)}loop();
function confetti(n=160){if(reduce)return;const cs=["#F4C2C2","#D4AF37","#6B2D39","#fff"];
 for(let i=0;i<n;i++)bits.push({x:innerWidth/2,y:innerHeight*.45,vx:(Math.random()-.5)*14,vy:-Math.random()*13-3,a:0,va:Math.random()*.4-.2,c:cs[i%4]})}
/* routing */
const views=$$(".view");
function route(){let id=location.hash.slice(1);if(!views.some(v=>v.id===id))id="countdown";
 if(!done&&id!=="countdown")id="countdown";
 views.forEach(v=>v.classList.toggle("show",v.id===id));


 scrollTo(0,0)}
addEventListener("hashchange",route);
function lock(){}
/* countdown */
let running=false,timer;
function start(){running=true;done=false;lock();bgm.pause();bgm.currentTime=0;mb.textContent="Music: off";mb.setAttribute("aria-pressed","false");let n=10;$("#hero").hidden=true;$("#replay").hidden=true;$("#num").hidden=false;$("#tease").hidden=false;
 const show=()=>{const e=$("#num");e.textContent=n;e.classList.remove("tick");void e.offsetWidth;e.classList.add("tick");$("#tease").textContent=TEASERS[10-n];
  if(n===0){finish();return}n--;timer=setTimeout(show,1000)};show()}
function finish(){running=false;done=true;lock();playMusic();$("#num").hidden=true;$("#tease").hidden=true;$("#hero").hidden=false;$("#replay").hidden=false;confetti(220)}
$("#begin").onclick=()=>{bgm.play().then(()=>bgm.pause()).catch(()=>{});$("#beginBox").hidden=true;start()};
function playMusic(){bgm.play().then(()=>{mb.textContent="Music: on";mb.setAttribute("aria-pressed","true")}).catch(()=>{})}
$("#replay").onclick=()=>{clearTimeout(timer);start()};
/* music */
const bgm=$("#bgm"),mb=$("#music");
mb.onclick=()=>{if(bgm.paused){bgm.play().then(()=>{mb.textContent="Music: on";mb.setAttribute("aria-pressed","true")}).catch(()=>{})}else{bgm.pause();mb.textContent="Music: off";mb.setAttribute("aria-pressed","false")}};
/* polaroids */
$$(".pol").forEach(p=>p.onclick=()=>p.classList.toggle("flip"));
/* envelope */
$("#env").onclick=()=>{const e=$("#env");e.classList.add("open");$("#envHint").textContent="";confetti(60)};
let ci=0;const card=$("#card");
function note(){card.textContent=NOTES[ci%NOTES.length]}note();
$("#nextCard").onclick=card.onclick=()=>{ci++;note()};
card.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();ci++;note()}};
/* wheel */
const wc=$("#wheel"),w=wc.getContext("2d"),N=WHEEL.length,A=Math.PI*2/N,cols=["#F4C2C2","#fff","#D4AF37","#F4C2C2","#fff"];
let rot=0,vel=0,spinning=false;
function draw(){const R=wc.width/2;w.clearRect(0,0,wc.width,wc.height);
 WHEEL.forEach((s,i)=>{w.beginPath();w.moveTo(R,R);w.arc(R,R,R-6,rot+i*A,rot+(i+1)*A);w.closePath();w.fillStyle=cols[i];w.fill();w.strokeStyle="#6B2D39";w.lineWidth=2;w.stroke();
  w.save();w.translate(R,R);w.rotate(rot+(i+.5)*A);w.fillStyle="#6B2D39";w.font="700 26px 'Cormorant Garamond',serif";w.textAlign="right";w.fillText(s.t,R-26,8);w.restore()});
 w.beginPath();w.arc(R,R,R-6,0,7);w.strokeStyle="#D4AF37";w.lineWidth=6;w.stroke()}
function tick(){rot+=vel;vel*=.985;draw();if(vel>.002)requestAnimationFrame(tick);else{spinning=false;land()}}
$("#spin").onclick=()=>{if(spinning)return;spinning=true;vel=.35+Math.random()*.25;tick()};
function land(){const a=(((-Math.PI/2-rot)%(Math.PI*2))+Math.PI*2)%(Math.PI*2),r=WHEEL[Math.floor(a/A)];
 $("#resTitle").textContent=r.t;$("#resMsg").textContent=r.m;$("#resPh").dataset.file=r.img;
 const im=$("#resImg");im.removeAttribute("src");im.dataset.t=0;im.alt=r.t;im.src="assets/"+encodeURI(r.img);
 $("#modal").hidden=false;confetti(180)}
$("#close").onclick=()=>$("#modal").hidden=true;
draw();lock();route();
/* hide broken images so the placeholder shows until your photo is added */
const EXT=["jpg","jpeg","png","webp","gif","avif","JPG","JPEG","PNG"];
/* any image type works: if assets/memory1.jpg is missing, try .jpeg, .png, .webp ... */
addEventListener("error",e=>{const i=e.target;if(i.tagName!=="IMG")return;
 const m=(i.getAttribute("src")||"").match(/^(assets\/.+)\.\w+$/),n=+(i.dataset.t||0)+1;
 if(m&&n<EXT.length){i.dataset.t=n;i.src=m[1]+"."+EXT[n]}else i.style.display="none"},true);
function setImg(im,name){im.dataset.t=0;im.style.display="";im.parentElement.dataset.file=name;im.src="assets/"+encodeURI(name)}
$$(".pol img").forEach((im,i)=>setImg(im,FILES.memories[i]));
setImg($(".couple img"),FILES.couple);
const vid=$("video");vid.src="assets/"+encodeURI(FILES.video);
(function(){const b=FILES.poster.replace(/\.\w+$/,""),L=[FILES.poster].concat(EXT.map(x=>b+"."+x));
 (function p(i){const im=new Image();im.onload=()=>vid.poster=im.src;im.onerror=()=>{if(i<L.length-1)p(i+1)};im.src="assets/"+encodeURI(L[i])})(0)})();
addEventListener("load",e=>{if(e.target.tagName==="IMG")e.target.style.display=""},true);
