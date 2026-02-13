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

messaging.onBackgroundMessage(function(payload) {

  console.log("SW Background message:", payload);

  // ===== TAMPILKAN NOTIF =====
  self.registration.showNotification(
    payload.notification?.title || "DELTA 8",
    {
      body: payload.notification?.body || "",
      icon: "/Driver_Helper_Delta8/icon.png",
      data: payload.data || {}
    }
  );

  // ===== 🔥 KIRIM PESAN KE SEMUA TAB AKTIF =====
  self.clients.matchAll({
    type: "window",
    includeUncontrolled: true
  }).then(clients => {
    clients.forEach(client => {
      client.postMessage(payload.data);
    });
  });

});