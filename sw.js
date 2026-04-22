importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAUKCb9KtFxz_QyRSw6Y3Idd4lh6yGVAbo',
  authDomain: 'stockcalzado-1a926.firebaseapp.com',
  projectId: 'stockcalzado-1a926',
  storageBucket: 'stockcalzado-1a926.firebasestorage.app',
  messagingSenderId: '339643150583',
  appId: '1:339643150583:web:978dbfe1e5a2b5c7b2a3f2'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const {title, body} = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    image: '/icon-192.png'
  });
});

const CACHE = 'stockcalzado-v3';
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['./index.html', './manifest.json'])).then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if(e.request.url.includes('firebase') || e.request.url.includes('googleapis')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html'))));
});
