"use client";

import { Typography, Row, Col } from "antd";
import StatCard from "@/components/dashboard/StatCard";

const { Title } = Typography;

export default function Dashboard() {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <p>Welcome to your patient dashboard</p>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="Upcoming Appointments" value={2} color="#4096ff" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="Prescriptions" value={3} color="#36cfc9" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="Lab Results" value={1} color="#73d13d" />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard title="Messages" value={5} color="#ff7a45" />
        </Col>
      </Row>
    </div>
  );
}
