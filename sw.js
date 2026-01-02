const CACHE_NAME = 'tutor-genio-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Strategia semplice: prova la rete, se fallisce (e il file è in cache), usa la cache.
  // Per le chiamate API di Gemini, usiamo sempre la rete.
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
