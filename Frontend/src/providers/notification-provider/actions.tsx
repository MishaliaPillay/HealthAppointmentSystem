
// action.tsx 

"use client";
import { Notification } from "@/components/notification/page";
import { INotificationStateContext } from "./context";
import { createAction } from "redux-actions";

export enum NotificationActionEnums {
  getNotificationsPending = "GET_NOTIFICATIONS_PENDING",
  getNotificationsSuccess = "GET_NOTIFICATIONS_SUCCESS",
  getNotificationsError = "GET_NOTIFICATIONS_ERROR",

  markAsReadPending = "MARK_AS_READ_PENDING",
  markAsReadSuccess = "MARK_AS_READ_SUCCESS",
  markAsReadError = "MARK_AS_READ_ERROR",

  markAllAsReadPending = "MARK_ALL_AS_READ_PENDING",
  markAllAsReadSuccess = "MARK_ALL_AS_READ_SUCCESS",
  markAllAsReadError = "MARK_ALL_AS_READ_ERROR",

  deleteNotificationPending = "DELETE_NOTIFICATION_PENDING",
  deleteNotificationSuccess = "DELETE_NOTIFICATION_SUCCESS",
  deleteNotificationError = "DELETE_NOTIFICATION_ERROR",
}

// Get Notifications Actions
export const getNotificationsPending = createAction<INotificationStateContext>(
  NotificationActionEnums.getNotificationsPending,
  () => ({ isPending: true, isSuccess: false, isError: false, notifications: [] })
);

export const getNotificationsSuccess = createAction<INotificationStateContext, Notification[]>(
  NotificationActionEnums.getNotificationsSuccess,
  (notifications: Notification[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    notifications,
  })
);

export const getNotificationsError = createAction<INotificationStateContext>(
  NotificationActionEnums.getNotificationsError,
  () => ({ isPending: false, isSuccess: false, isError: true, notifications: [] })
);

// Mark as Read Actions
export const markAsReadPending = createAction<INotificationStateContext>(
  NotificationActionEnums.markAsReadPending,
  () => ({ isPending: true, isSuccess: false, isError: false, notifications: [] })
);

export const markAsReadSuccess = createAction<INotificationStateContext, Notification[]>(
  NotificationActionEnums.markAsReadSuccess,
  (notifications: Notification[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    notifications,
  })
);

export const markAsReadError = createAction<INotificationStateContext>(
  NotificationActionEnums.markAsReadError,
  () => ({ isPending: false, isSuccess: false, isError: true, notifications: [] })
);

// Mark All as Read Actions
export const markAllAsReadPending = createAction<INotificationStateContext>(
  NotificationActionEnums.markAllAsReadPending,
  () => ({ isPending: true, isSuccess: false, isError: false, notifications: [] })
);

export const markAllAsReadSuccess = createAction<INotificationStateContext, Notification[]>(
  NotificationActionEnums.markAllAsReadSuccess,
  (notifications: Notification[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    notifications,
  })
);

export const markAllAsReadError = createAction<INotificationStateContext>(
  NotificationActionEnums.markAllAsReadError,
  () => ({ isPending: false, isSuccess: false, isError: true, notifications: [] })
);

// Delete Notification Actions
export const deleteNotificationPending = createAction<INotificationStateContext>(
  NotificationActionEnums.deleteNotificationPending,
  () => ({ isPending: true, isSuccess: false, isError: false, notifications: [] })
);

export const deleteNotificationSuccess = createAction<INotificationStateContext, Notification[]>(
  NotificationActionEnums.deleteNotificationSuccess,
  (notifications: Notification[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    notifications,
  })
);

export const deleteNotificationError = createAction<INotificationStateContext>(
  NotificationActionEnums.deleteNotificationError,
  () => ({ isPending: false, isSuccess: false, isError: true, notifications: [] })
);