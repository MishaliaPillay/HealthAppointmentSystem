"use client";
import { useContext, useReducer, useEffect } from "react";
import { getAxiosInstace } from "@/utils/axiosInstance";
import { requestNotificationPermission, onMessageListener } from "@/utils/firebase";
import {
  INITIAL_STATE,
  NotificationStateContext,
  NotificationActionContext,
} from "./context";
import { NotificationReducer } from "./reducer";
import {
  deleteNotificationError,
  deleteNotificationPending,
  deleteNotificationSuccess,
  getNotificationsError,
  getNotificationsPending,
  getNotificationsSuccess,
  markAllAsReadError,
  markAllAsReadPending,
  markAllAsReadSuccess,
  markAsReadError,
  markAsReadPending,
  markAsReadSuccess,
} from "./actions";

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
  const instance = getAxiosInstace();

  useEffect(() => {
    const setupPushNotifications = async () => {
      try {
        const token = await requestNotificationPermission();
        if (token) {
          await instance.post('/notifications/register-device', { token });
        }
      } catch (error) {
        console.error('Failed to setup push notifications:', error instanceof Error ? error.message : 'Unknown error');
      }
    };

    setupPushNotifications();

    // Listen for foreground messages
    const messagePromise = onMessageListener();
    messagePromise.then((payload: FirebaseMessage) => {
      const { notification } = payload;
      const newNotification = {
        id: payload.data?.id || Date.now().toString(),
        title: notification.title,
        message: notification.body,
        time: new Date().toISOString(),
        read: false,
        severity: payload.data?.severity || 'info'
      };
      
      dispatch(getNotificationsSuccess([newNotification, ...state.notifications]));
    });

    return () => {
      // Cleanup if needed
    };
  }, [instance, state.notifications]);

  const getNotifications = async (userId: string) => {
    dispatch(getNotificationsPending());
    try {
      const response = await instance.get(`/notifications/${userId}`);
      dispatch(getNotificationsSuccess(response.data));
    } catch (error) {
      console.error("Failed to fetch notifications:", error instanceof Error ? error.message : 'Unknown error');
      dispatch(getNotificationsError());
    }
  };

  const markAsRead = async (notificationId: string) => {
    dispatch(markAsReadPending());
    try {
      const response = await instance.put(`/notifications/${notificationId}/read`);
      dispatch(markAsReadSuccess(response.data));
    } catch (error) {
      console.error("Failed to mark notification as read:", error instanceof Error ? error.message : 'Unknown error');
      dispatch(markAsReadError());
    }
  };

  const markAllAsRead = async (userId: string) => {
    dispatch(markAllAsReadPending());
    try {
      const response = await instance.put(`/notifications/${userId}/read-all`);
      dispatch(markAllAsReadSuccess(response.data));
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error instanceof Error ? error.message : 'Unknown error');
      dispatch(markAllAsReadError());
    }
  };

  const deleteNotification = async (notificationId: string) => {
    dispatch(deleteNotificationPending());
    try {
      await instance.delete(`/notifications/${notificationId}`);
      const updatedNotifications = state.notifications.filter(
        (n) => n.id !== notificationId
      );
      dispatch(deleteNotificationSuccess(updatedNotifications));
    } catch (error) {
      console.error("Failed to delete notification:", error instanceof Error ? error.message : 'Unknown error');
      dispatch(deleteNotificationError());
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