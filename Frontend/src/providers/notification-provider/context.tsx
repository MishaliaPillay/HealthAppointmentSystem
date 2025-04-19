"use client";
import { createContext } from "react";
import { Notification } from "@/components/notification/page";

export interface INotificationStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  notifications: Notification[];
}

export interface INotificationActionContext {
  getNotifications: (userId: string) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: (userId: string) => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
}

export const INITIAL_STATE: INotificationStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  notifications: [],
};

export const NotificationStateContext = createContext<INotificationStateContext>(INITIAL_STATE);
export const NotificationActionContext = createContext<INotificationActionContext | undefined>(undefined);