"use client";

import { Typography, Table, Tag, Button } from "antd";
import type { Appointment } from "@/interfaces/types";

const { Title } = Typography;

export default function AppointmentsPage() {
  // Mock data for appointments to be replaced with real data 
  const appointmentsData: Appointment[] = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2025-04-15",
      time: "09:30",
      status: "upcoming",
    },
    {
      id: "2",
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2025-04-22",
      time: "14:00",
      status: "upcoming",
    },
    {
      id: "3",
      doctor: "Dr. Emily Wilson",
      specialty: "General",
      date: "2025-03-30",
      time: "10:15",
      status: "completed",
    },
  ];

  const columns = [
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "upcoming" ? "blue" : "green"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Appointment) => (
        <Button type="link" size="small">
          {record.status === "upcoming" ? "Reschedule" : "View Details"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>My Appointments</Title>
      <Table
        dataSource={appointmentsData}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}
