"use client";

import { Layout } from "antd";
import Sidebar from "@/components/provider-dashboard/sidebar";
import Header from "@/components/provider-dashboard/header";
import { useState } from "react";

const { Content } = Layout;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? 60 : 200, transition: "all 0.2s" }}
      >
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#f5f5f5",
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
