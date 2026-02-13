importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "ISI_APIKEY",
  authDomain: "webkas-843cb.firebaseapp.com",
  projectId: "webkas-843cb",
  messagingSenderId: "290112385940",
  appId: "ISI_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  console.log("Background message:", payload);

  const notificationTitle =
    payload.notification?.title || "🔔 Notifikasi Baru";

  const notificationOptions = {
    body: payload.notification?.body || "Ada update terbaru",
    icon: '/icon.png',
    data: payload.data || {}
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );

});
