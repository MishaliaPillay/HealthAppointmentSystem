"use client";

import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  Space,
  Spin,
  Modal,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { styles } from "./styles";
import { AppointmentStatusReflist } from "@/enums/ReflistAppointStatus";
import {
  useProviderActions,
  useProviderState,
} from "@/providers/providerMedicPrac-provider";
import { useAppointmentActions } from "@/providers/appointment-provider";
import { useUserActions } from "@/providers/users-provider";
import {
  IAppointment,
  IAppointmentApiResponse,
} from "@/providers/appointment-provider/models";

const { Text } = Typography;

export default function ProviderAppointmentsPage() {
  const [appointments, setAppointments] = useState<IAppointmentApiResponse[]>(
    []
  );
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(
    null
  );

  const { isPending, isError, isSuccess, currentProvider } = useProviderState();
  const { getCurrentProvider } = useProviderActions();
  const { getAppointments, deleteAppointment, updateAppointment } =
    useAppointmentActions();
  const { getCurrentUser } = useUserActions();

  useEffect(() => {
    if (isPending) setLoading(true);
    if (isError || isSuccess) setLoading(false);
    if (!currentProvider) fetchProviderOnReload();
  }, [isPending, isError, isSuccess, currentProvider]);

  useEffect(() => {
    if (currentProvider) loadAppointments();
  }, [currentProvider]);

  const fetchProviderOnReload = async () => {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      const user = await getCurrentUser(token);
      await getCurrentProvider(user.id);
    }
  };

  const loadAppointments = async () => {
    setLoading(true);
    const allAppointments = await getAppointments();
    const providerAppointments = (allAppointments ?? []).filter(
      (a) =>
        a.provider?.id === currentProvider?.id ||
        a.provider?.user.id === currentProvider?.user.id
    );

    const enrichedAppointments = providerAppointments.map((a) => ({
      ...a,
      patientName: a.patient?.user?.name ?? "Unknown",
    }));

    setAppointments(enrichedAppointments);
    setLoading(false);
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointmentToDelete(id);
    setIsModalVisible(true);
  };

  const confirmDelete = async () => {
    if (appointmentToDelete) {
      setLoading(true);
      await deleteAppointment(appointmentToDelete);
      setAppointments((prev) =>
        prev.filter((a) => a.id !== appointmentToDelete)
      );
      setLoading(false);
    }
    setIsModalVisible(false);
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
  };

  const handleEditAppointment = (appointment: IAppointmentApiResponse) => {
    setSelectedAppointment({
      ...appointment,
      providerId: appointment.provider?.id,
      patientId: appointment.patient?.id,
    });
    setEditModalVisible(true);
  };

  const handleUpdateAppointment = async (values: Partial<IAppointment>) => {
    if (!selectedAppointment) return;

    const updated = { ...selectedAppointment, ...values };
    setConfirmLoading(true);

    await updateAppointment(selectedAppointment.id, updated);
    setConfirmLoading(false);
    setEditModalVisible(false);

    setAppointments((prev) =>
      prev.map((app) =>
        app.id === selectedAppointment.id ? { ...app, ...updated } : app
      )
    );
  };

  const filteredData = appointments.filter((a) =>
    a.purpose?.toLowerCase().includes(searchText.toLowerCase())
  );

  const getStatusColor = (status: number) => {
    switch (status) {
      case AppointmentStatusReflist.Completed:
        return "green";
      case AppointmentStatusReflist.Pending:
        return "orange";
      case AppointmentStatusReflist.Cancelled:
        return "red";
      case AppointmentStatusReflist.Confirmed:
        return "blue";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: number) => {
    const entry = Object.entries(AppointmentStatusReflist).find(
      ([, val]) => val === status
    );
    return entry?.[0] ?? "Unknown";
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "appointmentDate",
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
      render: (time: string) => {
        const date = new Date(`1970-01-01T${time}Z`);
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      title: "Patient",
      dataIndex: "patientName",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
    },
    {
      title: "Status",
      dataIndex: "appointmentStatus",
      render: (status: number) => (
        <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record: IAppointmentApiResponse) => {
        const isEditable =
          record.appointmentStatus === AppointmentStatusReflist.Pending ||
          record.appointmentStatus === AppointmentStatusReflist.Confirmed;

        return isEditable ? (
          <Space>
            <Button
              className="edit-button"
              onClick={() => handleEditAppointment(record)}
            >
              Edit
            </Button>
            <Button
              className="delete-button"
              danger
              onClick={() => handleDeleteAppointment(record.id)}
            >
              Delete
            </Button>
          </Space>
        ) : (
          <Tooltip title="Only Pending or Confirmed appointments can be edited.">
            <Text type="secondary">Not Editable</Text>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Input
          placeholder="Search by purpose"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {loading ? (
        <Spin spinning={loading} tip="Loading appointments...">
          <div />
        </Spin>
      ) : (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          locale={{ emptyText: "No appointments found." }}
          style={styles.responsiveTable}
        />
      )}

      <Modal
        title="Are you sure you want to delete this appointment?"
        open={isModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>This action cannot be undone.</p>
      </Modal>

      <Modal
        title="Edit Appointment"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={() =>
          handleUpdateAppointment({
            purpose: selectedAppointment?.purpose,
            appointmentDate: selectedAppointment?.appointmentDate,
            appointmentTime: selectedAppointment?.appointmentTime,
            appointmentStatus: selectedAppointment?.appointmentStatus,
          })
        }
        okText="Update"
        confirmLoading={confirmLoading}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            placeholder="Purpose"
            value={selectedAppointment?.purpose}
            onChange={(e) =>
              setSelectedAppointment((prev) =>
                prev ? { ...prev, purpose: e.target.value } : null
              )
            }
          />
          <Input
            type="date"
            value={selectedAppointment?.appointmentDate?.split("T")[0]}
            onChange={(e) =>
              setSelectedAppointment((prev) =>
                prev ? { ...prev, appointmentDate: e.target.value } : null
              )
            }
          />
          <Input
            type="time"
            value={selectedAppointment?.appointmentTime}
            onChange={(e) =>
              setSelectedAppointment((prev) =>
                prev ? { ...prev, appointmentTime: e.target.value } : null
              )
            }
          />
          <Select
            value={selectedAppointment?.appointmentStatus}
            onChange={(value) =>
              setSelectedAppointment((prev) =>
                prev ? { ...prev, appointmentStatus: value } : null
              )
            }
          >
            {Object.keys(AppointmentStatusReflist)
              .filter((k) => isNaN(Number(k)))
              .map((key) => (
                <Select.Option key={key} value={AppointmentStatusReflist[key]}>
                  {key}
                </Select.Option>
              ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
}
