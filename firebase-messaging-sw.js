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

// ===== BACKGROUND MESSAGE =====
messaging.onBackgroundMessage(function(payload) {

  const notificationTitle = payload.notification?.title || "DELTA 8";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/icon.png",
    data: payload.data || {}
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ===== CLICK NOTIFICATION =====
self.addEventListener("notificationclick", function(event) {

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(function(clientList) {

        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];

          if ("focus" in client) {
            client.postMessage({ action: "refresh" });
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow("/");
        }
      })
  );
});