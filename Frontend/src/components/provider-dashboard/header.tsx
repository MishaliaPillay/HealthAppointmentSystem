"use client";

import { Layout, Button, Dropdown, Space } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import type { MenuProps } from "antd";
import { useUserState } from "@/providers/users-provider";
import NotificationPopup from "../notification/page";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { user } = useUserState();

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link href="/provider-dashboard/profile">Profile</Link>,
    },
    {
      key: "logout",
      label: "Logout",
      onClick: () => console.log("logout"),
    },
  ];

  return (
    <AntHeader
      style={{
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#001529",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{ color: "white" }}
      />

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px',
        height: '100%',
        marginRight: '12px'
      }}>
        <NotificationPopup
          userId={user?.id || ""}
          title="Provider Notifications"
        />
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space style={{ cursor: "pointer", color: "white" }}>
            <UserOutlined />
            <span>{user?.name || "Provider"}</span>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
