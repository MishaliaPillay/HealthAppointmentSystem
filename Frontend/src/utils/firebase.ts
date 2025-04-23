import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

let messaging: ReturnType<typeof getMessaging> | null = null;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize only on client
if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export const requestNotificationPermission = async (userId: string) => {
  if (!messaging || typeof window === 'undefined') return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BJJiQQpJR5ZOzMh08WxFDUA4MiSjPcnIXc9xLXyrW56eLOC4MQBJFNJc6RgJQ8DpRVKsjbU84k2J8ZRz6lKXnM0',
      });

      const tokenMap = JSON.parse(sessionStorage.getItem('fcmTokens') || '{}');
      tokenMap[userId] = token;
      sessionStorage.setItem('fcmTokens', JSON.stringify(tokenMap));

      console.log('FCM Token stored for user:', userId);
      return token;
    }

    console.log('Notification permission denied');
    return null;
  } catch (error) {
    console.error('Error getting notification permission:', error);
    return null;
  }
};

export const sendNotification = async (
  token: string,
  title: string,
  body: string,
  data = {}
) => {
  if (!token) return { success: false, error: 'No token provided' };

  try {
    const response = await fetch(
      'https://us-central1-health-appointment-syste-7069e.cloudfunctions.net/sendNotification',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, title, body, data }),
      }
    );

    return response.json();
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error: 'Failed to send notification' };
  }
};

export const getFcmToken = (userId: string) => {
  if (typeof window === 'undefined') return null;

  const tokenMap = JSON.parse(sessionStorage.getItem('fcmTokens') || '{}');
  return tokenMap[userId] || null;
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    }
  });
};
