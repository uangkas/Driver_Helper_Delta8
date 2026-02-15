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

  const title = payload.data.title || "DELTA 8";
  const options = {
    body: payload.data.body || "",
    icon: "icon.png"
  };

  self.registration.showNotification(title, options);
});