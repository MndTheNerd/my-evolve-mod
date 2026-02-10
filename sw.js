const CACHE_NAME = 'evolve-v2';
const ASSETS = [
  './',
  './index.html',
  './evolve/main.js',
  './evolve/evolve.css',
  './lib/lz-string.min.js',
  './lib/jquery.min.js',
  './lib/popper.min.js',
  './evolved.ico'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
