const CACHE_NAME = 'delta8-v1'; // Pastikan huruf 'c' kecil pada const
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/1828/1828640.png'
];

// 1. Install & Cache Assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // Memaksa SW baru langsung aktif
});

// 2. Fetch Strategy: Network First, Fallback to Cache
// Sangat penting agar data JSON/API Anda selalu yang terbaru
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// 3. Notifikasi Klik
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            // Jika tab sudah terbuka, fokus ke tab tersebut
            for (let client of windowClients) {
                if (client.url.includes('github.io') && 'focus' in client) {
                    return client.focus();
                }
            }
            // Jika tab belum ada, buka tab baru
            if (clients.openWindow) {
                return clients.openWindow('./');
            }
        })
    );
});
