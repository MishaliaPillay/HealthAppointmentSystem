"use client";

import { Layout, Button, Dropdown, Space } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import NotificationPopup, { Notification } from "../notification/page";
import Link from "next/link";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
  

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  const signOutUser = () => {
    sessionStorage.removeItem("jwt");
    router.push("/");
  };
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link href="/patient-dashboard/profile">Profile</Link>,
    },
    {
      key: "logout",
      label: "Logout",
      onClick: signOutUser,
    },
  ];

  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Appointment",
      message: "You have a new appointment request",
      time: "5 mins ago",
      read: false,
      severity: "info"
    }
  ];

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
        <NotificationPopup notifications={notifications} />
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space style={{ cursor: "pointer", color: "white" }}>
            <UserOutlined />
            <span className="hidden sm:inline">John Doe</span>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
