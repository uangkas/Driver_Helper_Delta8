importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAWuaS0RpcxZ_gU0B_4DMmqetkYnKuvlYM",
  authDomain: "webkas-843cb.firebaseapp.com",
  projectId: "webkas-843cb",
  messagingSenderId: "290112385940",
  appId: "1:290112385940:web:bf36abc7542b693334d581"
});

const messaging = firebase.messaging();

/**
 * 🔒 FINAL LOCK BEHAVIOR
 * - TIDAK peduli tab aktif / background
 * - TIDAK peduli visibility
 * - SELALU tampilkan notifikasi
 */
messaging.onBackgroundMessage((payload) => {

  const title = payload?.data?.title || '🔔 DELTA 8';
  const body  = payload?.data?.body  || '';

  self.registration.showNotification(title, {
    body,
    icon: '/Driver_Helper_Delta8/icon-192.png',
    badge: '/Driver_Helper_Delta8/icon-192.png',

    // 🔒 HARD LOCK
    tag: 'delta8-final-lock',
    renotify: true,
    requireInteraction: true,

    data: payload.data || {}
  });
});