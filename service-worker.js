self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/main.jsx',
        '/manifest.json',
        '/src/task-fav.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
