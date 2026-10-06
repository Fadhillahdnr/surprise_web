const screens=[...document.querySelectorAll('.screen')];
const show=(id)=>{screens.forEach(s=>s.classList.toggle('active',s.id===id));syncMedia(id);window.scrollTo({top:0,behavior:'smooth'});};
document.querySelectorAll('[data-page]').forEach(btn=>btn.addEventListener('click',()=>show(btn.dataset.page)));
const envelope=document.getElementById('envelope'); envelope.addEventListener('click',()=>{envelope.classList.add('open');document.getElementById('message').classList.add('show');});
// Backsound: looping di semua halaman, berhenti sementara saat audio/video lain diputar
const bgm=document.getElementById('bgm'),noteAudio=document.getElementById('noteAudio'),playlistAudio=document.getElementById('playlistAudio'),noteBtn=document.getElementById('noteBtn'),musicBtn=document.getElementById('musicBtn');
const NOTE_START=53; let bgmOn=true;
const foreground=[...document.querySelectorAll('.screen video'),noteAudio,playlistAudio];
const anyForeground=()=>foreground.some(m=>!m.paused&&!m.ended);
const resumeBgm=()=>{if(bgmOn&&!anyForeground())bgm.play().catch(()=>{});};
foreground.forEach(m=>{m.addEventListener('play',()=>bgm.pause());m.addEventListener('pause',resumeBgm);m.addEventListener('ended',resumeBgm);});
// Browser butuh interaksi pertama sebelum audio boleh bunyi
bgm.play().catch(()=>{});
const kickBgm=()=>resumeBgm(); document.addEventListener('click',kickBgm); bgm.addEventListener('playing',()=>document.removeEventListener('click',kickBgm),{once:true});
musicBtn.addEventListener('click',()=>{bgmOn=!bgmOn;bgmOn?resumeBgm():bgm.pause();musicBtn.textContent=bgmOn?'♫':'🔇';musicBtn.setAttribute('aria-pressed',bgmOn);musicBtn.setAttribute('aria-label',bgmOn?'Matikan backsound':'Nyalakan backsound');});
// Lagu Perjalanan Kita, mulai dari detik ke-53
noteAudio.currentTime=NOTE_START;
noteBtn.addEventListener('click',()=>{if(!noteAudio.paused)return noteAudio.pause();if(noteAudio.ended||noteAudio.currentTime<NOTE_START)noteAudio.currentTime=NOTE_START;noteAudio.play().catch(()=>{});});
noteAudio.addEventListener('play',()=>noteBtn.textContent='❚❚ Playing...');
['pause','ended'].forEach(e=>noteAudio.addEventListener(e,()=>noteBtn.textContent='▶ Play Note'));
// Player Our Playlist
const playBtn=document.getElementById('playBtn'),seek=document.getElementById('seek'),curTime=document.getElementById('curTime'),durTime=document.getElementById('durTime'),album=document.getElementById('album');
const fmt=t=>`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;
playBtn.addEventListener('click',()=>{playlistAudio.paused?playlistAudio.play().catch(()=>{}):playlistAudio.pause();});
playlistAudio.addEventListener('play',()=>{playBtn.textContent='❚❚';playBtn.setAttribute('aria-label','Jeda lagu');album.classList.add('spinning');});
['pause','ended'].forEach(e=>playlistAudio.addEventListener(e,()=>{playBtn.textContent='▶';playBtn.setAttribute('aria-label','Putar lagu');album.classList.remove('spinning');}));
playlistAudio.addEventListener('ended',()=>{playlistAudio.currentTime=0;});
playlistAudio.addEventListener('loadedmetadata',()=>{seek.max=playlistAudio.duration;durTime.textContent=fmt(playlistAudio.duration);});
playlistAudio.addEventListener('timeupdate',()=>{seek.value=playlistAudio.currentTime;curTime.textContent=fmt(playlistAudio.currentTime);});
seek.addEventListener('input',()=>{playlistAudio.currentTime=seek.value;});
// Media di halaman aktif diputar dari awal; media di halaman lain di-pause & di-reset
const syncMedia=(id)=>{document.querySelectorAll('.screen video').forEach(v=>{v.pause();v.currentTime=0;if(v.closest('.screen').id!==id)return;v.play().catch(()=>{v.muted=true;v.play().catch(()=>{});});});if(id!=='journey'){noteAudio.pause();noteAudio.currentTime=NOTE_START;}if(id!=='playlist'){playlistAudio.pause();playlistAudio.currentTime=0;}};
// Add tiny floating particles on load
const layer=document.querySelector('.sparkles'); for(let i=0;i<18;i++){const s=document.createElement('i');s.style.cssText=`position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px;border-radius:50%;background:white;opacity:${.15+Math.random()*.45};animation:twinkle ${2+Math.random()*4}s ease-in-out infinite alternate;`;layer.appendChild(s)}
const st=document.createElement('style');st.textContent='@keyframes twinkle{from{transform:scale(.5);opacity:.15}to{transform:scale(1.8);opacity:.8}}';document.head.appendChild(st);
