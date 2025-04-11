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

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
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
      label: <Link href="/provider-dashboard/calendar">calendar</Link>,
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
      onClick: () => console.log("logout clicked"),
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
        <Avatar style={{ backgroundColor: "#87CEFA" }}>JD</Avatar>
        {!collapsed && <div style={{ margin: "12px 0" }}>John Doe</div>}
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
