"use client";
import React, { useState } from "react";
import {
  Calendar,
  Badge,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Drawer,
  List,
  Avatar,
  Button,
  Radio,
} from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  ClockCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import styles from "./ProviderCalendar.module.css";
import { Appointment } from "@/interfaces/provider-interface";

const { Title, Text } = Typography;

// Define appointment types and their colors
const appointmentTypes = {
  checkup: { color: "blue", label: "Check-up" },
  consultation: { color: "green", label: "Consultation" },
  followUp: { color: "purple", label: "Follow-up" },
  emergency: { color: "red", label: "Emergency" },
  vaccination: { color: "cyan", label: "Vaccination" },
  therapy: { color: "orange", label: "Therapy" },
};

// dummy appointments for the next 30 days
const generateAppointments = () => {
  const appointments = [];
  const today = dayjs();

  // Generate 2-5 appointments per day for the next 30 days
  for (let i = 0; i < 30; i++) {
    const date = today.add(i, "day");
    const appointmentCount = Math.floor(Math.random() * 4) + 2;

    for (let j = 0; j < appointmentCount; j++) {
      const hour = Math.floor(Math.random() * 8) + 9;
      const minute = Math.random() > 0.5 ? 0 : 30;

      const appointmentTypeKeys = Object.keys(appointmentTypes);
      const type =
        appointmentTypeKeys[
          Math.floor(Math.random() * appointmentTypeKeys.length)
        ];

      const firstNames = [
        "John",
        "Sarah",
        "Michael",
        "Emma",
        "David",
        "Lisa",
        "Robert",
        "Jennifer",
        "William",
        "Maria",
      ];
      const lastNames = [
        "Smith",
        "Johnson",
        "Williams",
        "Brown",
        "Jones",
        "Miller",
        "Davis",
        "Garcia",
        "Rodriguez",
        "Wilson",
      ];
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

      appointments.push({
        id: `appointment-${i}-${j}`,
        patientName: `${firstName} ${lastName}`,
        patientId: `P${Math.floor(Math.random() * 10000)}`,
        patientPhone: `(${Math.floor(Math.random() * 900) + 100})-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 9000) + 1000}`,
        patientEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        date: date.format("YYYY-MM-DD"),
        time: `${hour}:${minute === 0 ? "00" : "30"}`,
        duration: 30,
        type,
        notes: `${appointmentTypes[type].label} appointment for ${firstName} ${lastName}.`,
      });
    }
  }

  return appointments;
};

const dummyAppointments = generateAppointments();

const ProviderCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [mode, setMode] = useState<CalendarMode>("month");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment>(null);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  const getAppointmentsForDate = (date: Dayjs) => {
    return dummyAppointments.filter((appointment) => {
      return appointment.date === date.format("YYYY-MM-DD");
    });
  };

  const dateCellRender = (value: Dayjs) => {
    const appointments = getAppointmentsForDate(value);

    return (
      <ul className={styles.events}>
        {appointments.slice(0, 3).map((appointment) => (
          <li
            key={appointment.id}
            onClick={() => handleAppointmentClick(appointment)}
          >
            <Badge
              color={appointmentTypes[appointment.type].color}
              text={`${appointment.time} ${
                appointment.patientName.split(" ")[0]
              }`}
              className={styles.badgeText}
            />
          </li>
        ))}
        {appointments.length > 3 && (
          <li>
            <Text type="secondary">{`+${appointments.length - 3} more`}</Text>
          </li>
        )}
      </ul>
    );
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDrawerOpen(true);
  };

  const onSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const onPanelChange = (date: Dayjs, mode: CalendarMode) => {
    setSelectedDate(date);
    setMode(mode);
  };

  // Daily agenda component
  const DailyAgenda = ({ date }: { date: Dayjs }) => {
    const appointments = getAppointmentsForDate(date);
    appointments.sort((a, b) => a.time.localeCompare(b.time));

    return (
      <Card
        title={`Appointments for ${date.format("MMMM D, YYYY")}`}
        className={styles.agendaCard}
      >
        {appointments.length === 0 ? (
          <Text type="secondary">No appointments scheduled for this day.</Text>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={appointments}
            renderItem={(appointment) => (
              <List.Item
                key={appointment.id}
                onClick={() => handleAppointmentClick(appointment)}
                className={styles.appointmentItem}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={<UserOutlined />}
                      style={{
                        backgroundColor:
                          appointmentTypes[appointment.type].color,
                      }}
                    />
                  }
                  title={
                    <div>
                      <Text strong>{appointment.patientName}</Text>
                      <Tag
                        color={appointmentTypes[appointment.type].color}
                        className={styles.appointmentTag}
                      >
                        {appointmentTypes[appointment.type].label}
                      </Tag>
                    </div>
                  }
                  description={
                    <>
                      <ClockCircleOutlined /> {appointment.time} -{" "}
                      {appointment.duration} min
                      <div>ID: {appointment.patientId}</div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    );
  };

  // List view component
  const AppointmentList = () => {
    const startOfWeek = selectedDate.startOf("week");
    let weeklyAppointments = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = startOfWeek.add(i, "day");
      const dateAppointments = getAppointmentsForDate(currentDate);
      weeklyAppointments = [...weeklyAppointments, ...dateAppointments];
    }

    weeklyAppointments.sort((a, b) => {
      // Sort by date first, then by time
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    });

    return (
      <Card
        title={`Appointments for Week of ${startOfWeek.format("MMMM D, YYYY")}`}
      >
        <List
          itemLayout="horizontal"
          dataSource={weeklyAppointments}
          renderItem={(appointment) => (
            <List.Item
              key={appointment.id}
              onClick={() => handleAppointmentClick(appointment)}
              className={styles.appointmentItem}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<UserOutlined />}
                    style={{
                      backgroundColor: appointmentTypes[appointment.type].color,
                    }}
                  />
                }
                title={
                  <div>
                    <Text strong>{appointment.patientName}</Text>
                    <Tag
                      color={appointmentTypes[appointment.type].color}
                      className={styles.appointmentTag}
                    >
                      {appointmentTypes[appointment.type].label}
                    </Tag>
                  </div>
                }
                description={
                  <>
                    <div>
                      {dayjs(appointment.date).format("MMM D")} •{" "}
                      {appointment.time} • {appointment.duration} min
                    </div>
                    <div>ID: {appointment.patientId}</div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    );
  };

  const getDrawerWidth = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 600 ? 400 : "80%";
    }
    return 400;
  };

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={16} md={18} lg={20}>
          <Title level={2}>Provider Calendar</Title>
        </Col>
        <Col xs={24} sm={8} md={6} lg={4}>
          <Radio.Group
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            buttonStyle="solid"
            className={styles.viewToggle}
          >
            <Radio.Button value="calendar">Calendar</Radio.Button>
            <Radio.Button value="list">List</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      {viewMode === "calendar" ? (
        <>
          <Card className={styles.calendarCard}>
            <Calendar
              value={selectedDate}
              onSelect={onSelect}
              onPanelChange={onPanelChange}
              dateCellRender={dateCellRender}
              mode={mode}
            />
          </Card>
          <DailyAgenda date={selectedDate} />
        </>
      ) : (
        <AppointmentList />
      )}

      <Drawer
        title="Appointment Details"
        placement="right"
        closable={true}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={getDrawerWidth()}
        className={styles.appointmentDrawer}
      >
        {selectedAppointment && (
          <div>
            <div className={styles.drawerSection}>
              <Tag
                color={appointmentTypes[selectedAppointment.type].color}
                className={styles.detailTag}
              >
                {appointmentTypes[selectedAppointment.type].label}
              </Tag>
              <Title level={4}>{selectedAppointment.patientName}</Title>
              <Text type="secondary">
                Patient ID: {selectedAppointment.patientId}
              </Text>
            </div>

            <div className={styles.drawerSection}>
              <Title level={5}>Appointment Time</Title>
              <Text>
                {dayjs(selectedAppointment.date).format("dddd, MMMM D, YYYY")}
                <br />
                {selectedAppointment.time} ({selectedAppointment.duration}{" "}
                minutes)
              </Text>
            </div>

            <div className={styles.drawerSection}>
              <Title level={5}>Contact Information</Title>
              <p>
                <PhoneOutlined className={styles.contactIcon} />{" "}
                {selectedAppointment.patientPhone}
              </p>
              <p>
                <MailOutlined className={styles.contactIcon} />{" "}
                {selectedAppointment.patientEmail}
              </p>
            </div>

            <div className={styles.drawerSection}>
              <Title level={5}>Notes</Title>
              <Text>{selectedAppointment.notes}</Text>
            </div>

            <div className={styles.drawerActions}>
              <Button type="default">Cancel Appointment</Button>
              <Button type="primary">Reschedule</Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ProviderCalendarPage;
