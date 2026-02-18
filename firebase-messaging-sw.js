importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "XXXX",
  authDomain: "XXXX.firebaseapp.com",
  projectId: "XXXX",
  messagingSenderId: "XXXX",
  appId: "XXXX"
});

const messaging = firebase.messaging();

// 🔔 PUSH BACKGROUND (WAJIB)
messaging.onBackgroundMessage(payload => {

  const title = payload?.data?.title || '🔔 DELTA 8';
  const body  = payload?.data?.body  || '';

  self.registration.showNotification(title, {
    body,
    icon: '/Driver_Helper_Delta8/icon-192.png',
    badge: '/Driver_Helper_Delta8/icon-192.png',
    tag: 'delta8',
    renotify: false,
    data: payload.data || {}
  });
});