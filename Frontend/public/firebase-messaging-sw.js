importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAOC311h_PfeL7wBaRrsMCnMLCpJ3sIEjQ",
    authDomain: "health-appointment-syste-7069e.firebaseapp.com",
    projectId: "health-appointment-syste-7069e",
    storageBucket: "health-appointment-syste-7069e.firebasestorage.app",
    messagingSenderId: "308533145366",
    appId: "1:308533145366:web:28633c769a7318377daa37"
  });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);
  
  const { title, body } = payload.notification || {};
  
  self.registration.showNotification(title || 'New Notification', {
    body: body || 'You have a new notification',
    icon: '/your-app-icon.png'
  });
});