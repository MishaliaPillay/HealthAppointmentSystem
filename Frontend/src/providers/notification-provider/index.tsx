"use client";
import { useReducer, useEffect, useContext } from "react";
import { 
  INITIAL_STATE, 
  NotificationStateContext, 
  NotificationActionContext 
} from "./context";
import { NotificationReducer } from "./reducer";
import {
  getNotificationsPending,
  getNotificationsSuccess,
  getNotificationsError,
  markAsReadSuccess,
  markAllAsReadSuccess,
  deleteNotificationSuccess
} from "./actions";
import { 
  requestNotificationPermission, 
  onMessageListener
} from "@/utils/firebase";
import { Notification } from "@/components/notification/page";

// FirebaseMessage interface
interface FirebaseMessage {
  notification: {
    title: string;
    body: string;
  };
  data?: {
    id?: string;
    severity?: string;
  };
}

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(NotificationReducer, INITIAL_STATE);

  // Set up Firebase notification listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Request permission when provider loads
    const userId = sessionStorage.getItem('currentUserId'); // Or however you track current user
    if (userId) {
      requestNotificationPermission(userId);
    }

    // Listen for foreground messages
    const handleMessages = async () => {
      try {
        const payload = await onMessageListener() as FirebaseMessage;
        if (!payload) return;
        
        const { notification } = payload;
        const newNotification: Notification = {
          id: payload.data?.id || Date.now().toString(),
          title: notification.title,
          message: notification.body,
          time: new Date().toISOString(),
          read: false,
          severity: (payload.data?.severity as "info" | "error" | "success" | "warning") || 'info'
        };
        
        // Add to local notifications state
        dispatch(getNotificationsSuccess([...state.notifications, newNotification]));
      } catch (error) {
        console.error("Error handling FCM message:", error);
      }
    };
    
    handleMessages();
    
    // Set up a recurring check for new messages
    const messageInterval = setInterval(handleMessages, 3000);
    
    return () => {
      clearInterval(messageInterval);
    };
  }, [state.notifications]);

  // Modified methods to match the expected return types

  const getNotifications = async (userId: string): Promise<void> => {
    dispatch(getNotificationsPending());
    
    try {
      console.log(`Getting notifications for user: ${userId}`);
      // In this approach, notifications are only stored in state
      dispatch(getNotificationsSuccess(state.notifications));
    } catch (error) {
      console.error("Error fetching notifications:", error);
      dispatch(getNotificationsError());
    }
  };

  const markAsRead = async (notificationId: string): Promise<void> => {
    try {
      const updatedNotifications = state.notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      );
      
      dispatch(markAsReadSuccess(updatedNotifications));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async (userId: string): Promise<void> => {
    try {
      console.log(`Marking all notifications as read for user: ${userId}`);
      const updatedNotifications = state.notifications.map(n => ({ ...n, read: true }));
      dispatch(markAllAsReadSuccess(updatedNotifications));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const deleteNotification = async (notificationId: string): Promise<void> => {
    try {
      const updatedNotifications = state.notifications.filter(n => n.id !== notificationId);
      dispatch(deleteNotificationSuccess(updatedNotifications));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationActionContext.Provider
        value={{
          getNotifications,
          markAsRead,
          markAllAsRead,
          deleteNotification,
        }}
      >
        {children}
      </NotificationActionContext.Provider>
    </NotificationStateContext.Provider>
  );
};

// Hook exports
export const useNotificationState = () => {
  const context = useContext(NotificationStateContext);
  if (!context) {
    throw new Error(
      "useNotificationState must be used within a NotificationProvider"
    );
  }
  return context;
};

export const useNotificationActions = () => {
  const context = useContext(NotificationActionContext);
  if (!context) {
    throw new Error(
      "useNotificationActions must be used within a NotificationProvider"
    );
  }
  return context;
};