"use client"

import { useState, useEffect, useRef } from "react"
import { useNotificationState, useNotificationActions } from "@/providers/notification-provider"
import { NotificationStyles } from "./style"

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  severity?: "info" | "success" | "warning" | "error"
}

interface NotificationPopupProps {
  userId: string
  title?: string
  emptyMessage?: string
}

export default function NotificationPopup({
  userId,
  title = "Notifications",
  emptyMessage = "No notifications",
}: NotificationPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const { notifications } = useNotificationState()
  const { getNotifications, markAsRead, markAllAsRead } = useNotificationActions()

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    if (userId) {
      getNotifications(userId)
    }
  }, [userId, getNotifications])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen])

  const toggleNotifications = () => {
    setIsOpen(!isOpen)
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead(userId)
  }

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markAsRead(notification.id)
    }
  }

  return (
    <div className={NotificationStyles}>
      <div className="notification-container">
        <button 
          className="notification-bell" 
          onClick={toggleNotifications} 
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="bell-icon"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </button>

        {isOpen && (
          <>
            <div className="notification-overlay" onClick={() => setIsOpen(false)} />
            <div className="notification-popup" ref={popupRef}>
              <div className="notification-header">
                <h3>{title}</h3>
                {unreadCount > 0 && (
                  <button className="mark-read-button" onClick={handleMarkAllAsRead}>
                    Mark all as read
                  </button>
                )}
                <button className="close-button" onClick={() => setIsOpen(false)}>
                  ✕
                </button>
              </div>

              <div className="notification-content">
                {notifications.length === 0 ? (
                  <div className="empty-message">{emptyMessage}</div>
                ) : (
                  <div className="notification-list">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-item ${!notification.read ? "unread" : ""} ${notification.severity || "info"}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className={`notification-icon ${notification.severity || "info"}`}>
                          {notification.severity === "success" && "✓"}
                          {notification.severity === "error" && "✕"}
                          {notification.severity === "warning" && "⚠️"}
                          {(notification.severity === "info" || !notification.severity) && "ℹ"}
                        </div>
                        <div className="notification-details">
                          <div className="notification-title">{notification.title}</div>
                          <div className="notification-message">{notification.message}</div>
                          <div className="notification-time">{notification.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}