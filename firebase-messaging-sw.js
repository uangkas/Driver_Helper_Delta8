/* =========================================================
 * FIREBASE MESSAGING SERVICE WORKER
 * DELTA 8 — FINAL LOCKED VERSION
 * ========================================================= */

/* === IMPORT FIREBASE (WAJIB) === */
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

/* === INIT FIREBASE (MINIMAL & AMAN UNTUK SW) === */
firebase.initializeApp({
  apiKey: "AIzaSyAWuaS0RpcxZ_gU0B_4DMmqetkYnKuvlYM",
  projectId: "webkas-843cb",
  messagingSenderId: "290112385940",
  appId: "1:290112385940:web:bf36abc7542b693334d581"
});

/* === INIT MESSAGING === */
const messaging = firebase.messaging();

/* =========================================================
 * 🔒 BACKGROUND PUSH — FULL LOCK
 * APAPUN KONDISINYA → NOTIF PASTI MUNCUL
 * ========================================================= */
messaging.onBackgroundMessage((payload) => {

  const title = payload?.data?.title || '🔔 DELTA 8';
  const body  = payload?.data?.body  || '';

  self.registration.showNotification(title, {
    body: body,

    icon: '/Driver_Helper_Delta8/icon-192.png',
    badge: '/Driver_Helper_Delta8/icon-192.png',

    /* 🔥 KUNCI UTAMA (ANTI DIANGGAP UPDATE) */
    tag: 'delta8-' + Date.now(),   // ⬅️ WAJIB DINAMIS
    requireInteraction: true,      // ⬅️ NOTIF TIDAK AUTO HILANG

    data: payload.data || {}
  });
});

/* =========================================================
 * OPTIONAL: NOTIFICATION CLICK (AMAN)
 * ========================================================= */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
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
 * SERVICE WORKER LIFECYCLE (ANTI MATI)
 * ========================================================= */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});