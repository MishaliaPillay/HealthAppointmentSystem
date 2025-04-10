"use client";

import { useState, useEffect } from "react";
import { Typography, Table, Tag, Button, Select, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./styles";

const { Title } = Typography;
const { Option } = Select;

// Define the Appointment interface within this file if not imported
interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

export default function AppointmentsPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Handle window resize for responsiveness
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }

    return undefined;
  }, []);

  // Mock data for appointments with more items for pagination
  const generateAppointmentsData = (): Appointment[] => {
    const statuses: Array<"upcoming" | "completed" | "cancelled"> = [
      "upcoming",
      "completed",
      "cancelled",
    ];
    const specialties = [
      "Cardiology",
      "Dermatology",
      "General",
      "Pediatrics",
      "Neurology",
      "Orthopedics",
      "Ophthalmology",
      "Psychiatry",
    ];
    const doctors = [
      "Dr. Sarah Johnson",
      "Dr. Michael Chen",
      "Dr. Emily Wilson",
      "Dr. David Rodriguez",
      "Dr. Lisa Taylor",
      "Dr. James Brown",
      "Dr. Maria Garcia",
      "Dr. John Smith",
      "Dr. Karen Davis",
      "Dr. Robert Kim",
      "Dr. Jessica Wright",
      "Dr. Thomas Lee",
    ];

    // Generate 50 appointments
    return Array.from({ length: 50 }, (_, i) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return {
        id: (i + 1).toString(),
        doctor: doctors[Math.floor(Math.random() * doctors.length)],
        specialty: specialties[Math.floor(Math.random() * specialties.length)],
        date: new Date(2025, 3 + Math.floor(i / 10), 1 + (i % 28))
          .toISOString()
          .split("T")[0],
        time: `${9 + Math.floor(Math.random() * 8)}:${
          Math.random() > 0.5 ? "30" : "00"
        }`,
        status: status,
      };
    });
  };

  const appointmentsData = generateAppointmentsData();

  // Filter the data based on search and status filter
  const filteredData = appointmentsData.filter((appointment) => {
    const matchesSearch =
      appointment.doctor.toLowerCase().includes(searchText.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Define responsive columns based on screen size
  const getColumns = () => {
    // Base columns that always show
    const baseColumns = [
      {
        title: "Doctor",
        dataIndex: "doctor",
        key: "doctor",
        sorter: (a: Appointment, b: Appointment) =>
          a.doctor.localeCompare(b.doctor),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <Tag
            color={
              status === "upcoming"
                ? "blue"
                : status === "completed"
                ? "green"
                : "red"
            }
            style={styles.statusTag}
          >
            {status.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_: unknown, record: Appointment) => (
          <Space size="small">
            <Button type="link" style={styles.actionButton}>
              {record.status === "upcoming" ? "Reschedule" : "View Details"}
            </Button>
            {record.status === "upcoming" && (
              <Button type="link" danger style={styles.actionButton}>
                Cancel
              </Button>
            )}
          </Space>
        ),
      },
    ];

    // Add more columns for larger screens
    if (windowWidth > styles.mobileBreakpoint) {
      const additionalColumns = [
        {
          title: "Specialty",
          dataIndex: "specialty",
          key: "specialty",
          render: (specialty: string) => specialty, // Adding render to match expected types
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          sorter: (a: Appointment, b: Appointment) =>
            a.date.localeCompare(b.date),
        },
        {
          title: "Time",
          dataIndex: "time",
          key: "time",
          render: (time: string) => time, // Adding render to match expected types
        },
      ];

      // Insert additional columns after the first column
      return [
        baseColumns[0],
        ...additionalColumns,
        baseColumns[1],
        baseColumns[2],
      ];
    }

    return baseColumns;
  };

  // Expandable row config for mobile view
  const expandableConfig = {
    expandedRowRender: (record: Appointment) => (
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        <li>
          <strong>Specialty:</strong> {record.specialty}
        </li>
        <li>
          <strong>Date:</strong> {record.date}
        </li>
        <li>
          <strong>Time:</strong> {record.time}
        </li>
      </ul>
    ),
    expandRowByClick: true,
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Title level={2} style={styles.titleText}>
          My Appointments
        </Title>

        <div style={styles.headerControls}>
          <div style={styles.searchFilter}>
            <Input
              placeholder="Search by doctor or specialty"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={styles.searchInput}
            />

            <Select
              defaultValue="all"
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              style={styles.filterSelect}
            >
              <Option value="all">All Status</Option>
              <Option value="upcoming">Upcoming</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </div>
        </div>
      </div>

      <div style={styles.responsiveTable}>
        <Table
          dataSource={filteredData}
          columns={getColumns()}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page) => setCurrentPage(page),
            onShowSizeChange: (_, size) => setPageSize(size),
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            total: filteredData.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          expandable={
            windowWidth <= styles.mobileBreakpoint
              ? expandableConfig
              : undefined
          }
        />
      </div>
    </div>
  );
}
