"use client";

import { Layout, Button, Dropdown, Space, MenuProps } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useUserState } from "@/providers/users-provider";
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
      if (sessionStorage.length === 0) {
        router.push("/");
      }
    };


  const { currentUser } = useUserState();

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link href="/patient-dashboard/profile">Profile</Link>,
    },
    {
      key: "logout",
      label: (
        <Button
          type="text"
          onClick={() => signOutUser()}
          style={{ padding: 0 }}
        >
          Logout
        </Button>
      ),
    },
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

      <Dropdown menu={{ items }} placement="bottomRight">
        <Space style={{ cursor: "pointer", color: "white" }}>
          <span className="hidden sm:inline">{currentUser?.name}</span>
          <UserOutlined />
        </Space>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;
