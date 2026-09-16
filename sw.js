const C='semaine-v3-1';
const A=['./','./index.html','./app.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();
  e.waitUntil(caches.open(C).then(c=>c.addAll(A)).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(
  caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{
    const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp).catch(()=>{}));return r;
  }).catch(()=>caches.match(e.request).then(m=>m||caches.match('./app.html'))));});
