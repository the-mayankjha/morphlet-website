const menu=document.getElementById('mobile-menu');if(menu){menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('.nav').classList.toggle('menu-open',open);};document.querySelectorAll('#main-nav a').forEach(link=>link.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');document.querySelector('.nav').classList.remove('menu-open');}));}
const current=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('#main-nav a').forEach(a=>{if(a.getAttribute('href')===current)a.setAttribute('aria-current','page');});
if('IntersectionObserver'in window){document.documentElement.classList.add('js');const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
document.querySelectorAll('[data-filter]').forEach(button=>button.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-category]').forEach(row=>row.hidden=button.dataset.filter!=='all'&&row.dataset.category!==button.dataset.filter);});

// Keep the homepage release badge current without blocking the rest of the site.
if(document.getElementById('home-release')){
 const badge=document.getElementById('home-release');
 const show=data=>{const release=Array.isArray(data)?data.find(r=>!r.draft&&!r.prerelease):null;if(!release||!/^v?\d+\.\d+\.\d+(?:[-+][a-zA-Z0-9.-]+)?$/.test(release.tag_name))return;badge.textContent=release.tag_name+' · Explore what’s new ＋';badge.setAttribute('aria-label','Explore Morphlet '+release.tag_name+' release notes');};
 (async()=>{try{const response=await fetch('assets/releases.json');if(response.ok)show(await response.json());}catch{}try{const response=await fetch('https://api.github.com/repos/the-mayankjha/morphlet/releases?per_page=5',{signal:AbortSignal.timeout(6000),headers:{Accept:'application/vnd.github+json'}});if(response.ok)show(await response.json());}catch{}})();
}
// Escape closes navigation without trapping keyboard focus on mobile.
if(menu)document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');document.querySelector('.nav').classList.remove('menu-open');menu.focus();}});
