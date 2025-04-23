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
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { AppointmentStatusReflist } from "@/enums/ReflistAppointStatus";
import {
  useProviderActions,
  useProviderState,
} from "@/providers/providerMedicPrac-provider";
import { useAppointmentActions } from "@/providers/appointment-provider";
import { useUserActions, useUserState } from "@/providers/users-provider";
import {
  IAppointment,
  IAppointmentApiResponse,
} from "@/providers/appointment-provider/models";
import styles from "./styles";

const { Option } = Select;

export default function ProviderAppointmentsPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);
  const [appointments, setAppointments] = useState<IAppointmentApiResponse[]>(
    []
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
    const response = await getAppointments();
    const fetchedAppointments = response ?? [];
    const filteredAppointments = fetchedAppointments.filter(
      (appointment) =>
        appointment.provider?.id === currentProvider?.id ||
        appointment.provider?.user.id === currentProvider?.user.id
    );
    const enhancedAppointmentsData = await Promise.all(
      filteredAppointments.map(async (appointment) => {
        try {
          return {
            ...appointment,
            patientName: appointment.patient.user.name,
          };
        } catch (error) {
          console.error(
            `Failed to fetch patient ${appointment.patient}:`,
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

  // const handleDeleteAppointment = async (appointmentId: string) => {
  //   Modal.confirm({
  //     title: "Are you sure you want to delete this appointment?",
  //     content: "This action cannot be undone.",
  //     onOk: async () => {
  //       await deleteAppointment(appointmentId);
  //       setAppointments(appointments.filter((a) => a.Patient.id !== appointmentId));
  //     },
  //   });
  // };

  // const handleEditAppointment = (appointment: IAppointment) => {
  //   setSelectedAppointment(appointment);
  //   setEditModalVisible(true);
  // };

  // const handleUpdateAppointment = async (values: Partial<IAppointment>) => {
  //   if (!selectedAppointment) return;

  //   await updateAppointment(selectedAppointment.id, values);
  //   setEditModalVisible(false);

  //   setAppointments((prevAppointments) =>
  //     prevAppointments.map((app) =>
  //       app.id === selectedAppointment.id ? { ...app, ...values } : app
  //     )
  //   );
  // };

  // const handleStatusChange = async (id: string, newStatus: number) => {
  //   await updateAppointment(id, { appointmentStatus: newStatus });
  //   setAppointments((prev) =>
  //     prev.map((app) =>
  //       app.id === id ? { ...app, appointmentStatus: newStatus } : app
  //     )
  //   );
  // };

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
      render: (name: string) => `${name}`,
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    // {
    //   title: "Status",
    //   dataIndex: "appointmentStatus",
    //   key: "appointmentStatus",
    //   render: (status, record) => (
    //     <Select
    //       defaultValue={status}
    //       onChange={(value) => handleStatusChange(record.id, value)}
    //     >
    //       {Object.keys(AppointmentStatusReflist)
    //         .filter((key) => isNaN(Number(key)))
    //         .map((statusKey) => (
    //           <Option
    //             key={statusKey}
    //             value={AppointmentStatusReflist[statusKey]}
    //           >
    //             {statusKey}
    //           </Option>
    //         ))}
    //     </Select>
    //   ),
    // },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_: unknown, record: IAppointment) => (
    //     <Space size="small">
    //       <Button type="link" onClick={() => handleEditAppointment(record)}>
    //         Edit
    //       </Button>
    //       <Button
    //         type="link"
    //         danger
    //         onClick={() => handleDeleteAppointment(record.id)}
    //       >
    //         Delete
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div style={styles.container}>
      {/* Search Input */}
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by purpose"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Spin spinning={loading} tip="Loading appointments...">
        <Table<IAppointmentApiResponse>
          dataSource={filteredData}
          columns={getColumns()}
          rowKey="id"
          locale={{ emptyText: "No appointments found." }}
        />
      </Spin>
    </div>
  );
}
