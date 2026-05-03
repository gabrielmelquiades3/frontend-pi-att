const CACHE_NAME = 'ativ-comp-v1';
const BASE = '/frontend-pi-att';

const arquivos = [
  `${BASE}/index.html`,
  `${BASE}/menu.html`,
  `${BASE}/dashbord.html`,
  `${BASE}/alunos.html`,
  `${BASE}/cursos.html`,
  `${BASE}/solicitacoes.html`,
  `${BASE}/style.css`,
  `${BASE}/global.css`,
  `${BASE}/menu.css`,
  `${BASE}/manifest.json`,
  `${BASE}/icons/icon-192.png`,
  `${BASE}/icons/icon-512.png`
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(arquivos);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
