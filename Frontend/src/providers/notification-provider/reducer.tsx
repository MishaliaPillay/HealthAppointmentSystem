"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE } from "./context";
import { NotificationActionEnums } from "./actions";

export const NotificationReducer = handleActions(
  {
    [NotificationActionEnums.getNotificationsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [NotificationActionEnums.getNotificationsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [NotificationActionEnums.getNotificationsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [NotificationActionEnums.markAsReadPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [NotificationActionEnums.markAsReadSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [NotificationActionEnums.markAsReadError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [NotificationActionEnums.markAllAsReadPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [NotificationActionEnums.markAllAsReadSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [NotificationActionEnums.markAllAsReadError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [NotificationActionEnums.deleteNotificationPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [NotificationActionEnums.deleteNotificationSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [NotificationActionEnums.deleteNotificationError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);