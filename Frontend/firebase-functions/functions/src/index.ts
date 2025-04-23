import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

interface NotificationPayload {
  token: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

export const sendNotification = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).send("");
    return;
  }
  
  if (req.method !== "POST") {
    res.status(405).send({ error: "Method Not Allowed" });
    return;
  }
  
  try {
    const { token, title, body, data }: NotificationPayload = req.body;
    
    if (!token) {
      res.status(400).send({ error: "FCM token is required" });
      return;
    }
    
    const message = {
      token,
      notification: {
        title: title || "New Notification",
        body: body || "You have a new notification"
      },
      data: data || {}
    };
    
    const response = await admin.messaging().send(message);
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send({ error: (error as Error).message });
  }
});