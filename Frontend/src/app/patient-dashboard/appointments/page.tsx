"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Table,
  Tag,
  Button,
  Select,
  Input,
  Space,
  Spin,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AppointmentStatusReflist } from "@/enums/ReflistAppointStatus";
import {
  usePatientActions,
  usePatientState,
} from "@/providers/paitient-provider";
import { useAppointmentActions } from "@/providers/appointment-provider";
import { useUserActions } from "@/providers/users-provider";
import { useProviderActions } from "@/providers/providerMedicPrac-provider";
import { IAppointment } from "@/providers/appointment-provider/models";
import styles from "./styles";

const { Title } = Typography;
const { Option } = Select;

export default function AppointmentsPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<Record<string, string>>({});

  const { isPending, isError, isSuccess, currentPatient } = usePatientState();
  const { getCurrentPatient } = usePatientActions();
  const { getAppointments } = useAppointmentActions();
  const { getCurrentUser } = useUserActions();
  const { getProviders } = useProviderActions();

  useEffect(() => {
    if (isPending) setLoading(true);
    if (isError || isSuccess) setLoading(false);
    if (!currentPatient) fetchPatientOnReload();
  }, [isError, isPending, isSuccess, currentPatient]);

  const fetchPatientOnReload = async (): Promise<void> => {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      try {
        const user = await getCurrentUser(token);
        await getCurrentPatient(user.id);
      } catch (err) {
        console.error("Error loading patient:", err);
      }
    }
  };

  useEffect(() => {
    getAppointments();
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    const providerList = await getProviders();
    if (Array.isArray(providerList)) {
      const providerMap = providerList.reduce((map, provider) => {
         map[provider._id] = `${provider.user.surname} ${
           provider.user.surname || ""
         }`.trim();
        return map;
      }, {} as Record<string, string>);
      setProviders(providerMap);
    }
  };

  const appointmentsData: IAppointment[] = currentPatient?.appointments || [];

  const filteredData = appointmentsData.filter((appointment) => {
    const matchesSearch = appointment.purpose
      .includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      appointment.appointmentStatus === Number(statusFilter);

    return matchesSearch && matchesStatus;
  });

  const handleReschedule = (appointmentId: string) => {
    console.log("Reschedule appointment:", appointmentId);
  };

  const handleCancel = (appointmentId: string) => {
    console.log("Cancel appointment:", appointmentId);
  };

  const getColumns = () => [
    {
      title: "Date",
      dataIndex: "appointmentDate" as keyof IAppointment,
      key: "appointmentDate",
      render: (date: Date) =>
        new Date(date).toLocaleDateString("en-ZA", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      title: "Time",
      dataIndex: "appointmentTime" as keyof IAppointment,
      key: "appointmentTime",
    },
    {
      title: "Provider",
      dataIndex: "providerId" as keyof IAppointment,
      key: "providerId",
      render: (id: string) => providers[id] || "Unknown Provider",
    },
    {
      title: "Purpose",
      dataIndex: "purpose" as keyof IAppointment,
      key: "purpose",
    },
    {
      title: "Status",
      dataIndex: "appointmentStatus" as keyof IAppointment,
      key: "appointmentStatus",
      render: (status: AppointmentStatusReflist) => {
        const colorMap: Record<AppointmentStatusReflist, string> = {
          [AppointmentStatusReflist.Pending]: "blue",
          [AppointmentStatusReflist.Confirmed]: "gold",
          [AppointmentStatusReflist.Completed]: "green",
          [AppointmentStatusReflist.Cancelled]: "red",
          [AppointmentStatusReflist.NoShow]: "volcano",
        };
        return (
          <Tag color={colorMap[status]} style={styles.statusTag}>
            {AppointmentStatusReflist[status]?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IAppointment) => (
        <Space size="small">
          <Button
            type="link"
            onClick={() => handleReschedule(record.id!)}
            style={styles.actionButton}
          >
            {record.appointmentStatus === AppointmentStatusReflist.Pending
              ? "Reschedule"
              : "View Details"}
          </Button>
          {record.appointmentStatus === AppointmentStatusReflist.Pending && (
            <Button
              type="link"
              danger
              onClick={() => handleCancel(record.id!)}
              style={styles.actionButton}
            >
              Cancel
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Title level={2} style={styles.titleText}>
          My Appointments
        </Title>

        <div style={styles.headerControls}>
          <div style={styles.searchFilter}>
            <Input
              placeholder="Search by purpose"
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
              {Object.keys(AppointmentStatusReflist)
                .filter((key) => isNaN(Number(key)))
                .map((statusKey) => (
                  <Option
                    key={statusKey}
                    value={AppointmentStatusReflist[statusKey]}
                  >
                    {statusKey}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
      </div>

      <div style={styles.responsiveTable}>
        {loading ? (
          <Spin spinning tip="Loading appointments..." />
        ) : (
          <Table<IAppointment>
            dataSource={filteredData}
            columns={getColumns()}
            rowKey="id"
            locale={{ emptyText: "No appointments found." }}
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
          />
        )}
      </div>
    </div>
  );
}
