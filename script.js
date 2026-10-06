const screens=[...document.querySelectorAll('.screen')];
const show=(id)=>{screens.forEach(s=>s.classList.toggle('active',s.id===id));document.querySelectorAll('video').forEach(v=>v.pause());window.scrollTo({top:0,behavior:'smooth'});};
document.querySelectorAll('[data-page]').forEach(btn=>btn.addEventListener('click',()=>show(btn.dataset.page)));
const envelope=document.getElementById('envelope'); envelope.addEventListener('click',()=>{envelope.classList.add('open');document.getElementById('message').classList.add('show');});
const play=document.getElementById('playBtn'); let playing=false; play.addEventListener('click',()=>{playing=!playing;play.textContent=playing?'❚❚':'▶';});
const note=document.getElementById('noteBtn'); note.addEventListener('click',()=>{note.textContent=note.textContent.includes('Play')?'❚❚ Playing...':'▶ Play Note';});
const musicBtn=document.getElementById('musicBtn'); musicBtn.addEventListener('click',()=>{musicBtn.textContent=musicBtn.textContent==='♫'?'🔇':'♫';});
// Add tiny floating particles on load
const layer=document.querySelector('.sparkles'); for(let i=0;i<18;i++){const s=document.createElement('i');s.style.cssText=`position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px;border-radius:50%;background:white;opacity:${.15+Math.random()*.45};animation:twinkle ${2+Math.random()*4}s ease-in-out infinite alternate;`;layer.appendChild(s)}
const st=document.createElement('style');st.textContent='@keyframes twinkle{from{transform:scale(.5);opacity:.15}to{transform:scale(1.8);opacity:.8}}';document.head.appendChild(st);
