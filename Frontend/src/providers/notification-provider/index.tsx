"use client";
import { useContext, useReducer } from "react";
import { getAxiosInstace } from "@/utils/axiosInstance";
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

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(NotificationReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getNotifications = async (userId: string) => {
    dispatch(getNotificationsPending());
    try {
      const response = await instance.get(`/notifications/${userId}`);
      dispatch(getNotificationsSuccess(response.data));
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      dispatch(getNotificationsError());
    }
  };

  const markAsRead = async (notificationId: string) => {
    dispatch(markAsReadPending());
    try {
      const response = await instance.put(`/notifications/${notificationId}/read`);
      dispatch(markAsReadSuccess(response.data));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      dispatch(markAsReadError());
    }
  };

  const markAllAsRead = async (userId: string) => {
    dispatch(markAllAsReadPending());
    try {
      const response = await instance.put(`/notifications/${userId}/read-all`);
      dispatch(markAllAsReadSuccess(response.data));
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      dispatch(markAllAsReadError());
    }
  };

  const deleteNotification = async (notificationId: string) => {
    dispatch(deleteNotificationPending());
    try {
      await instance.delete(`/notifications/${notificationId}`);
      // Refresh notifications after deletion
      const updatedNotifications = state.notifications.filter(
        (n) => n.id !== notificationId
      );
      dispatch(deleteNotificationSuccess(updatedNotifications));
    } catch (error) {
      console.error("Failed to delete notification:", error);
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