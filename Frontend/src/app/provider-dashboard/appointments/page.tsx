"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Select,
  Input,
  Space,
  Spin,
  Modal,
  Form,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AppointmentStatusReflist } from "@/enums/ReflistAppointStatus";
import {
  useProviderActions,
  useProviderState,
} from "@/providers/providerMedicPrac-provider";
import { useAppointmentActions } from "@/providers/appointment-provider";
import { useUserActions } from "@/providers/users-provider";
import { IAppointment } from "@/providers/appointment-provider/models";
import styles from "./styles";

const { Title } = Typography;
const { Option } = Select;

export default function ProviderAppointmentsPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);

  const { isPending, isError, isSuccess, currentProvider } = useProviderState();
  const { getCurrentProvider } = useProviderActions();
  const { getAppointments, deleteAppointment, updateAppointment } =
    useAppointmentActions();
  const { getCurrentUser } = useUserActions();

  useEffect(() => {
    if (isPending) setLoading(true);
    if (isError || isSuccess) setLoading(false);
    if (!currentProvider) fetchProviderOnReload();
  }, [isError, isPending, isSuccess, currentProvider]);

  const fetchProviderOnReload = async (): Promise<void> => {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      try {
        const user = await getCurrentUser(token);
        await getCurrentProvider(user.id);
      } catch (err) {
        console.error("Error loading provider:", err);
      }
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const appointmentsData: IAppointment[] = currentProvider?.appointments || [];

  const filteredData = appointmentsData.filter((appointment) => {
    const matchesSearch = appointment.purpose
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      appointment.appointmentStatus === Number(statusFilter);
    return matchesSearch && matchesStatus;
  });

  const handleDeleteAppointment = async (appointmentId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this appointment?",
      content: "This action cannot be undone.",
      onOk: async () => {
        await deleteAppointment(appointmentId);
        getAppointments();
      },
    });
  };

  const handleEditAppointment = (appointment: IAppointment) => {
    setSelectedAppointment(appointment);
    setEditModalVisible(true);
  };

  const handleUpdateAppointment = async (values: Partial<IAppointment>) => {
    if (!selectedAppointment) return;

    const cleanValues = { ...values };
    // Remove any React elements accidentally included
    Object.keys(cleanValues).forEach((key) => {
      if (typeof cleanValues[key] === "object" && cleanValues[key] !== null) {
        cleanValues[key] = JSON.parse(JSON.stringify(cleanValues[key])); // Deep clone without circular refs
      }
    });

    await updateAppointment(selectedAppointment.id, cleanValues);
    setEditModalVisible(false);
    getAppointments(); // Refresh list
  };

  const handleStatusChange = async (id: string, newStatus: number) => {
    await updateAppointment(id, { appointmentStatus: newStatus });
    getAppointments();
  };

  const getColumns = () => [
    {
      title: "Date",
      dataIndex: "appointmentDate",
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
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Patient",
      dataIndex: "patientId",
      key: "patientId",
      render: (id: string) => `Patient ID: ${id}`,
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Status",
      dataIndex: "appointmentStatus",
      key: "appointmentStatus",
      render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
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
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: IAppointment) => (
        <Space size="small">
          <Button type="link" onClick={() => handleEditAppointment(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteAppointment(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Title level={2} style={styles.titleText}>
          My Provider Appointments
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

      <Spin spinning={loading} tip="Loading appointments...">
        <Table<IAppointment>
          dataSource={filteredData}
          columns={getColumns()}
          rowKey="id"
          locale={{ emptyText: "No appointments found." }}
        />
      </Spin>

      {/* Edit Appointment Modal */}
      <Modal
        title="Edit Appointment"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleUpdateAppointment}
      >
        <Form
          initialValues={selectedAppointment}
          onFinish={handleUpdateAppointment}
        >
          <Form.Item label="Purpose" name="purpose">
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="appointmentDate">
            <Input />
          </Form.Item>
          <Form.Item label="Time" name="appointmentTime">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
