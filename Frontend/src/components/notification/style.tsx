import { css } from "@emotion/css";

export const NotificationStyles = css`
  .notification-container {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 100%;
  }

  .notification-bell {
    position: relative;
    background: none;
    border: none;
    color: #ffffff;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }

  .notification-bell:hover {
    opacity: 0.8;
  }

  .bell-icon {
    width: 24px;
    height: 24px;
    color: #ffffff;
  }

  .notification-badge {
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: #e53e3e;
    color: white;
    border-radius: 50%;
    padding: 2px;
    font-size: 0.75rem;
    min-width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .notification-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .notification-popup {
    position: absolute;
    top: 60px;
    right: 0;
    width: 400px;
    max-width: 90vw;
    background: #1a1a1a;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    z-index: 1000;
    border: 1px solid #333;
  }

  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #333;
    background: #262626;
  }

  .notification-header h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #ffffff;
  }

  .mark-read-button {
    background: none;
    border: none;
    color: #60a5fa;
    cursor: pointer;
    font-size: 0.875rem;
    padding: 4px 8px;
  }

  .mark-read-button:hover {
    color: #93c5fd;
    text-decoration: underline;
  }

  .close-button {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 1.25rem;
    padding: 4px;
    margin-left: 8px;
  }

  .close-button:hover {
    color: #ffffff;
  }

  .notification-content {
    max-height: 60vh;
    overflow-y: auto;
  }

  .notification-list {
    padding: 0;
  }

  .notification-item {
    display: flex;
    padding: 16px;
    border-bottom: 1px solid #333;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .notification-item:hover {
    background-color: #262626;
  }

  .notification-item.unread {
    background-color: #1e3a8a;
  }

  .notification-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex-shrink: 0;
  }

  .notification-icon.info {
    background-color: #1e40af;
    color: #93c5fd;
  }

  .notification-icon.success {
    background-color: #065f46;
    color: #6ee7b7;
  }

  .notification-icon.warning {
    background-color: #92400e;
    color: #fcd34d;
  }

  .notification-icon.error {
    background-color: #991b1b;
    color: #fca5a5;
  }

  .notification-details {
    flex: 1;
  }

  .notification-title {
    font-weight: 600;
    margin-bottom: 4px;
    color: #ffffff;
  }

  .notification-message {
    color: #d1d5db;
    font-size: 0.875rem;
    margin-bottom: 4px;
    line-height: 1.4;
  }

  .notification-time {
    color: #9ca3af;
    font-size: 0.75rem;
  }

  .empty-message {
    padding: 32px 16px;
    text-align: center;
    color: #9ca3af;
  }

  @media (max-width: 640px) {
    .notification-popup {
      width: 100%;
      max-width: 100%;
      height: 100vh;
      top: 0;
      right: 0;
      border-radius: 0;
    }

    .notification-content {
      max-height: calc(100vh - 64px);
    }
  }
`;
