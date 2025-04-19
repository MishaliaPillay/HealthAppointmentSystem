"use client";
import { Layout, Menu, Avatar } from "antd";

import {
  DashboardOutlined,
  CalendarOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { useUserActions, useUserState } from "@/providers/users-provider";
import { useEffect } from "react";
const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser();
    }
  })
  const router = useRouter();
  const signOutUser = () => {
     sessionStorage.removeItem("jwt");
    if (sessionStorage.length === 0) {
      router.push("/");
    }
  }
  
    const fetchCurrentUser = async () => {
      const token = sessionStorage.getItem("jwt");
      if (token) {
        await getCurrentUser(token).catch((err) => {
          console.error("Error fetching current user: ", err);
        });
      }
    };
 const { getCurrentUser }=useUserActions();
 const { currentUser,} = useUserState();
  const pathname = usePathname();

  const menuItems: MenuProps["items"] = [
    {
      key: "/patient-dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/patient-dashboard">Dashboard</Link>,
    },
    {
      key: "/patient-dashboard/appointments",
      icon: <CalendarOutlined />,
      label: (
        <Link href="/patient-dashboard/appointments">My Appointments</Link>
      ),
    },
    {
      key: "/patient-dashboard/medical-history",
      icon: <FileTextOutlined />,
      label: (
        <Link href="/patient-dashboard/medical-history">Medical History</Link>
      ),
    },

    {
      key: "help",
      icon: <QuestionCircleOutlined />,
      label: "Help",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => signOutUser(),
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="lg"
      collapsedWidth={80}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
      }}
      width={200}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "16px 0",
          color: "white",
        }}
      >
        <Avatar style={{ backgroundColor: "#87CEFA" }}>
          {" "}
          {currentUser ? currentUser.name?.[0] : "U"}
        </Avatar>
        {!collapsed && (
          <div style={{ margin: "12px 0" }}>{currentUser?.name}</div>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;


