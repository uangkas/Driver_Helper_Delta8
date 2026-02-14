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

  const title = payload.data?.title || "DELTA 8";
  const options = {
    body: payload.data?.body || "",
    icon: "icon.png",
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);

  self.clients.matchAll({
    type: "window",
    includeUncontrolled: true
  }).then(clients => {
    clients.forEach(client => {
      client.postMessage(payload.data);
    });
  });

});