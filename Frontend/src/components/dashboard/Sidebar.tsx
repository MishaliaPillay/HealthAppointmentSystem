"use client";

import { Layout, Menu, Avatar } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MenuProps } from "antd";
import { useUserActions, useUserState } from "@/providers/users-provider";
import { useEffect, useState } from "react";
import { getRole } from "@/utils/decoder";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { getCurrentUser } = useUserActions();
  const { currentUser } = useUserState();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      router.push("/");
      return;
    }
    const userRole = getRole(token);
    setRole(userRole);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      const token = sessionStorage.getItem("jwt");
      if (token) {
        getCurrentUser(token).catch((err) => {
          console.error("Error fetching current user: ", err);
        });
      }
    }
  }, [currentUser, getCurrentUser]);

  const signOutUser = () => {
    sessionStorage.removeItem("jwt");
    router.push("/");
  };

  // Full menu list including Back button
  const menuItems: MenuProps["items"] = [
    {
      key: `/${role}-dashboard/profile`,
      icon: <DashboardOutlined />,
      label: <Link href={`/${role}-dashboard`}>Dashboard</Link>,
    },
    {
      key: `/${role}-dashboard/appointments`,
      icon: <CalendarOutlined />,
      label: (
        <Link href={`/${role}-dashboard/appointments`}>My Appointments</Link>
      ),
    },
    ...(role === "patient"
      ? [
          {
            key: "/patient-dashboard/medical-history",
            icon: <FileTextOutlined />,
            label: (
              <Link href="/patient-dashboard/medical-history">
                Medical History
              </Link>
            ),
          },
        ]
      : []),
    {
      key: "help",
      icon: <QuestionCircleOutlined />,
      label: "Help",
    },
    {
      key: "back",
      icon: <ArrowLeftOutlined />,
      label: "Back",
      onClick: () => router.back(),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: signOutUser,
    },
  ];

  const getSelectedKey = () => {
    const match = menuItems
      .map((item) => item?.key as string)
      .find((key) => pathname.startsWith(key));
    return match || "";
  };

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
          {currentUser ? currentUser.name?.[0] : "U"}
        </Avatar>
        {!collapsed && (
          <div style={{ margin: "12px 0" }}>{currentUser?.name}</div>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
