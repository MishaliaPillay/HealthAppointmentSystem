import { FirebaseApp } from 'firebase/app';
import { Messaging } from 'firebase/messaging';

let app: FirebaseApp | undefined;
let messaging: Messaging | undefined;

// Initialize Firebase only on client side
const initializeFirebase = async () => {
  if (typeof window !== 'undefined' && !app) {
    const { initializeApp } = await import('firebase/app');
    const { getMessaging } = await import('firebase/messaging');

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
    return { app, messaging };
  }
  return { app, messaging };
};

export interface NotificationMessage {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export const requestNotificationPermission = async () => {
  try {
    await initializeFirebase();
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const { getToken } = await import('firebase/messaging');
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });
      return token;
    }
    throw new Error('Notification permission denied');
  } catch (error) {
    console.error('Notification permission error:', error);
    throw error;
  }
};

export const onMessageListener = async () => {
  await initializeFirebase();
  if (!messaging) return new Promise(() => {}); // Return an empty promise when messaging is not available

  const { onMessage } = await import('firebase/messaging');
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};