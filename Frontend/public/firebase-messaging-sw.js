self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

let firebaseApp;

// Import and initialize Firebase only when needed
async function initializeFirebase() {
  try {
    if (!firebaseApp && self.FIREBASE_CONFIG) {
      importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
      importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
      
      firebaseApp = firebase.initializeApp(self.FIREBASE_CONFIG);
    }
  } catch (error) {
    console.error('Failed to initialize Firebase in service worker:', error);
  }
}

self.addEventListener('message', async (event) => {
  if (event.data?.type === 'FIREBASE_CONFIG') {
    self.FIREBASE_CONFIG = event.data.config;
    await initializeFirebase();
  }
});

self.addEventListener('push', async (event) => {
  try {
    if (!firebaseApp) {
      await initializeFirebase();
    }
    
    const payload = event.data?.json();
    const notificationTitle = payload?.notification?.title || 'New Notification';
    const notificationOptions = {
      body: payload?.notification?.body,
      icon: '/images/logo.jpg',
      badge: '/images/logo.jpg',
      tag: payload?.data?.id || 'default',
      data: payload?.data,
      renotify: true
    };

    event.waitUntil(
      self.registration.showNotification(notificationTitle, notificationOptions)
    );
  } catch (error) {
    console.error('Error handling push event:', error);
  }
});

self.addEventListener('notificationclick', (event) => {
  try {
    event.notification.close();
    const urlToOpen = new URL('/patient-dashboard', self.location.origin).href;

    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((windowClients) => {
          const matchingClient = windowClients.find((client) => client.url === urlToOpen);
          if (matchingClient) {
            return matchingClient.focus();
          }
          return clients.openWindow(urlToOpen);
        })
    );
  } catch (error) {
    console.error('Error handling notification click:', error);
  }
});