/* =========================================================
 * FIREBASE MESSAGING SERVICE WORKER
 * DELTA 8 – FINAL SAFE VERSION
 * ========================================================= */

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

/* ===================== FIREBASE INIT ===================== */
firebase.initializeApp({
  apiKey: "AIzaSyAWuaS0RpcxZ_gU0B_4DMmqetkYnKuvlYM",
  authDomain: "webkas-843cb.firebaseapp.com",
  projectId: "webkas-843cb",
  messagingSenderId: "290112385940",
  appId: "1:290112385940:web:bf36abc7542b693334d581"
});

const messaging = firebase.messaging();

/* =========================================================
 * BACKGROUND PUSH HANDLER (WAJIB)
 * ========================================================= */
messaging.onBackgroundMessage((payload) => {

  const title = payload?.data?.title || '🔔 DELTA 8';
  const body  = payload?.data?.body  || '';

  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/badge.png',
    tag: 'delta8',          // ⛔ cegah dobel
    renotify: false,
    data: payload.data || {}
  });
});
/* =========================================================
 * NOTIFICATION CLICK (OPTIONAL TAPI AMAN)
 * ========================================================= */
self.addEventListener('notificationclick', (event) => {

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {

        for (const client of clientList) {
          if ('focus' in client) return client.focus();
        }

        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

/* =========================================================
 * SERVICE WORKER LIFE CYCLE (ANTI MATI)
 * ========================================================= */
self.addEventListener('install', (event) => {
  console.log('[SW] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activated');
  event.waitUntil(self.clients.claim());
});