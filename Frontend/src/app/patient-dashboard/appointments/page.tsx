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
  DatePicker,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { styles } from "./styles"; // Importing the custom styles
import { AppointmentStatusReflist } from "@/enums/ReflistAppointStatus"; // Enum for appointment statuses
import {
  usePatientActions,
  usePatientState,
} from "@/providers/paitient-provider";
import { useAppointmentActions } from "@/providers/appointment-provider";
import { useUserActions } from "@/providers/users-provider";
import {
  IAppointment,
  IAppointmentApiResponse,
} from "@/providers/appointment-provider/models"; // Types for appointment data

const { Text } = Typography;

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<IAppointmentApiResponse[]>(
    []
  ); // State to store appointments
  const [searchText, setSearchText] = useState(""); // Search filter for purpose
  const [dateFilter, setDateFilter] = useState<string | null>(null); // Date filter
  const [statusFilter, setStatusFilter] = useState<number | null>(null); // Status filter
  const [loading, setLoading] = useState(true); // Loading state
  const [editModalVisible, setEditModalVisible] = useState(false); // Modal visibility for editing
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null); // Selected appointment for editing
  const [confirmLoading, setConfirmLoading] = useState(false); // Confirm loading state

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility for deletion
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(
    null
  ); // Appointment to be deleted

  const { isPending, isError, isSuccess, currentPatient } = usePatientState();
  const { getCurrentPatient } = usePatientActions();
  const { getAppointments, deleteAppointment, updateAppointment } =
    useAppointmentActions();
  const { getCurrentUser } = useUserActions();

  // Fetching patient on reload or initial load
  useEffect(() => {
    if (isPending) setLoading(true);
    if (isError || isSuccess) setLoading(false);
    if (!currentPatient) fetchPatientOnReload();
  }, [isPending, isError, isSuccess, currentPatient]);

  useEffect(() => {
    if (currentPatient) loadAppointments();
  }, [currentPatient]);

  // Fetch patient data on reload
  const fetchPatientOnReload = async () => {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      const user = await getCurrentUser(token);
      await getCurrentPatient(user.id);
    }
  };

  // Fetch appointments based on the current patient
  const loadAppointments = async () => {
    setLoading(true);
    const allAppointments = await getAppointments();

    const patientAppointments = (allAppointments ?? []).filter(
      (a) =>
        a.patient?.id === currentPatient?.id ||
        a.patient?.user.id === currentPatient?.user.id
    );

    const enrichedAppointments = patientAppointments.map((a) => ({
      ...a,
      providerName: a.provider?.user?.name ?? "Unknown",
    }));

    setAppointments(enrichedAppointments);
    setLoading(false);
  };

  // Deleting appointment
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

  // Handling appointment editing
  const handleEditAppointment = (appointment: IAppointmentApiResponse) => {
    setSelectedAppointment({
      ...appointment,
      providerId: appointment.provider?.id,
      patientId: appointment.patient?.id,
    });
    setEditModalVisible(true);
  };

  // Updating appointment
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

  // Filter appointments based on purpose, date, and status
  const filteredData = appointments.filter((a) => {
    const matchesSearch = a.purpose
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesDate = dateFilter
      ? a.appointmentDate?.split("T")[0] === dateFilter
      : true;
    const matchesStatus =
      statusFilter !== null ? a.appointmentStatus === statusFilter : true;

    return matchesSearch && matchesDate && matchesStatus;
  });

  // Helper functions to handle status display
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

  // Table columns configuration
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
      title: "Provider",
      dataIndex: "providerName",
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
              loading={loading}
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
        {/* Search, date, status filter section */}
        <Space direction="horizontal" size="middle">
          <Input
            placeholder="Search by purpose"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={styles.searchInput}
          />

          <DatePicker
            onChange={(date) =>
              setDateFilter(date ? date.format("YYYY-MM-DD") : null)
            }
            placeholder="Filter by date"
            allowClear
          />

          <Select
            placeholder="Filter by status"
            style={{ width: 180 }}
            allowClear
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
          >
            {Object.keys(AppointmentStatusReflist)
              .filter((k) => isNaN(Number(k)))
              .map((key) => (
                <Select.Option key={key} value={AppointmentStatusReflist[key]}>
                  {key}
                </Select.Option>
              ))}
          </Select>

          {/* Clear filters button */}
          {(dateFilter || statusFilter !== null) && (
            <Button
              onClick={() => {
                setDateFilter(null);
                setStatusFilter(null);
              }}
            >
              Clear Filters
            </Button>
          )}
        </Space>
      </div>

      {loading ? (
        <Spin spinning={loading} tip="Loading your appointments...">
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

      {/* Delete confirmation modal */}
      <Modal
        title="Are you sure you want to delete this appointment?"
        open={isModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        cancelText="Cancel"
        loading={loading}
      >
        <p>This action cannot be undone.</p>
      </Modal>

      {/* Edit appointment modal */}
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
