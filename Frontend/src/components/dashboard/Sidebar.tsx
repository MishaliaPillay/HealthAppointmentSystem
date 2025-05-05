"use client";

import { Layout, Menu, Avatar } from "antd";
import {
  DashboardOutlined,
  ScheduleOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  FundOutlined,
  ArrowLeftOutlined,
  HeartOutlined,
  BookOutlined,
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
  const [user, setUser] = useState(null);
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
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("jwt");
        if (token) {
          const userData = await getCurrentUser(token);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
      }
    };

    fetchUser();
  }, []);

  const signOutUser = () => {
    sessionStorage.removeItem("jwt");
    window.location.reload();
    router.push("/login");
  };

  const menuItems: MenuProps["items"] = [
    {
      key: `/${role}-dashboard/profile`,
      icon: <DashboardOutlined />,
      label: <Link href={`/${role}-dashboard`}>Dashboard</Link>,
    },
    {
      key: `/${role}-dashboard/appointments`,
      icon: <ScheduleOutlined />,
      label: (
        <Link href={`/${role}-dashboard/appointments`}>My Appointments</Link>
      ),
    },
  ];

  if (role === "provider") {
    menuItems.push({
      key: "/provider-dashboard/speech-summarizer",
      icon: <ScheduleOutlined />,
      label: (
        <Link href="/provider-dashboard/speech-summarizer">Clinical Notes</Link>
      ),
    });
  }

  if (role === "patient") {
    menuItems.push(
      {
        key: "/patient-dashboard/face-scan",
        icon: <HeartOutlined />,
        label: <Link href="/patient-dashboard/face-scan">Well Being</Link>,
      },
      {
        key: "/patient-dashboard/booking-page",
        icon: <BookOutlined />,
        label: <Link href="/patient-dashboard/booking-page">Booking Page</Link>,
      },
      {
        key: "/patient-dashboard/health-analyze",
        icon: <FundOutlined />,
        label: (
          <Link href="/patient-dashboard/health-analyze">Health Analyze</Link>
        ),
      }
    );
  }
  menuItems.push(
    {
      key: "back",
      icon: <ArrowLeftOutlined />,
      label: "Back",
      onClick: () => router.back(),
    },
    {
      key: "/patient-dashboard/help",
      icon: <QuestionCircleOutlined />,
      label: <Link href="/patient-dashboard/help">Help</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: signOutUser,
    }
  );

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
          {user ? currentUser.name?.[0] : "U"}
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
