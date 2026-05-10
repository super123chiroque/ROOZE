/* Firebase Cloud Messaging Service Worker - App Ventas / Rooze */
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAUKCb9KtFxz_QyRSw6Y3Idd4lh6yGVAbo",
  authDomain: "stockcalzado-1a926.firebaseapp.com",
  projectId: "stockcalzado-1a926",
  storageBucket: "stockcalzado-1a926.firebasestorage.app",
  messagingSenderId: "339643150583",
  appId: "1:339643150583:web:978dbfe1e5a2b5c7b2a3f2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title =
    (payload.notification && payload.notification.title) ||
    "Nueva notificación";

  const options = {
    body: (payload.notification && payload.notification.body) || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: payload.data || {},
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
