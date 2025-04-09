"use client";

import { Layout, Button, Dropdown, Space } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import type { MenuProps } from "antd";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link href="/patient-dashboard/profile">Profile</Link>,
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
        background: "#4096ff",
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

      <Dropdown menu={{ items }} placement="bottomRight">
        <Space style={{ cursor: "pointer", color: "white" }}>
          <UserOutlined />
          <span className="hidden sm:inline">John Doe</span>
        </Space>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;
