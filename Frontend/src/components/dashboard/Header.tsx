"use client";

import { Layout, Button, Dropdown, Space } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useUserState } from "@/providers/users-provider";
import { useRouter } from "next/navigation";
import { getRole } from "@/utils/decoder";
import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { NotificationPopup, Notification } from "../notification/page";
import { useNotificationState, useNotificationActions } from "@/providers/notification-provider";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  const { currentUser } = useUserState();
  const [role, setRole] = useState<string | null>(null);
  const { notifications } = useNotificationState();
  const { markAsRead, markAllAsRead } = useNotificationActions();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      router.push("/");
      return;
    }

    const userRole = getRole(token);
    setRole(userRole);
    
    // Store user ID for notifications if not already stored
    if (currentUser?.id) {
      sessionStorage.setItem("currentUserId", String(currentUser.id));
    }
  }, [currentUser, router]);

  const signOutUser = () => {
    sessionStorage.removeItem("jwt");
    router.push("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link href={`/${role}-dashboard/profile`}>Profile</Link>,
    },
    {
      key: "logout",
      label: (
        <Button type="text" onClick={signOutUser} style={{ padding: 0 }}>
          Logout
        </Button>
      ),
    },
  ];

  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read when clicked
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.data?.appointmentId) {
      router.push(`/${role}-dashboard/appointments/${notification.data.appointmentId}`);
    }
  };

  const handleMarkAllAsRead = () => {
    if (currentUser?.id) {
      markAllAsRead(String(currentUser.id));
    }
  };

  return (
    <AntHeader
      style={{
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{ color: "white" }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <NotificationPopup 
          notifications={notifications} 
          onNotificationClick={handleNotificationClick}
          onMarkAllAsRead={handleMarkAllAsRead}
        />
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space style={{ cursor: "pointer", color: "white" }}>
            <UserOutlined />
            <span className="hidden sm:inline">{currentUser?.name}</span>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;