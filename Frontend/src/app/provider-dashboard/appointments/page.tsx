"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Select,
  Space,
  Spin,
  Modal,
  Table,
} from "antd";

import { AppointmentStatusReflist } from "@/enums/ReflistAppointStatus";
import {
  useProviderActions,
  useProviderState,
} from "@/providers/providerMedicPrac-provider";
import { useAppointmentActions } from "@/providers/appointment-provider";
import { useUserActions, useUserState } from "@/providers/users-provider";
import { IAppointment } from "@/providers/appointment-provider/models";
import styles from "./styles";
import { usePatientActions } from "@/providers/paitient-provider";

const { Option } = Select;

export default function ProviderAppointmentsPage() {
  const [searchText] = useState("");
  const [statusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const { isPending, isError, isSuccess, currentProvider } = useProviderState();
  const { getPatient } = usePatientActions();
  const { getCurrentProvider } = useProviderActions();
  const { getAppointments, deleteAppointment, updateAppointment } =
    useAppointmentActions();
  const { getCurrentUser } = useUserActions();

  const { currentUser } = useUserState();

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

  const loadAppointments = async () => {
    const fetchedAppointments = currentProvider?.appointments || [];

    const enhancedAppointmentsData = await Promise.all(
      fetchedAppointments.map(async (appointment) => {
        try {
          //const response = await getPatient(appointment.patientId);
          const response = (await getAppointments());
          console.log("Here is the response for getPatient:", response);
          return {
            ...appointment,
            patientName: response || "Unknown",
          };
        } catch (error) {
          console.error(
            `Failed to fetch patient ${appointment.patientId}:`,
            error
          );
          return { ...appointment, patientName: "Unknown" };
        }
      })
    );

    setAppointments(enhancedAppointmentsData);
  };
  useEffect(() => {
    loadAppointments();
  }, [currentProvider]);

  const filteredData = appointments.filter((appointment) => {
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
        setAppointments(appointments.filter((a) => a.id !== appointmentId));
      },
    });
  };

  const handleEditAppointment = (appointment: IAppointment) => {
    setSelectedAppointment(appointment);
    setEditModalVisible(true);
  };

  const handleUpdateAppointment = async (values: Partial<IAppointment>) => {
    if (!selectedAppointment) return;

    await updateAppointment(selectedAppointment.id, values);
    setEditModalVisible(false);

    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === selectedAppointment.id ? { ...app, ...values } : app
      )
    );
  };

  const handleStatusChange = async (id: string, newStatus: number) => {
    await updateAppointment(id, { appointmentStatus: newStatus });
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, appointmentStatus: newStatus } : app
      )
    );
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
      dataIndex: "patientName",
      key: "patientName",
      render: (name: string) => `Patient Name: ${name}`,
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
      <Spin spinning={loading} tip="Loading appointments...">
        <Table<IAppointment>
          dataSource={filteredData}
          columns={getColumns()}
          rowKey="id"
          locale={{ emptyText: "No appointments found." }}
        />
      </Spin>
    </div>
  );
}
