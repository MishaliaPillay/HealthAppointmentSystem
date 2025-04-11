"use client";

import { Typography, Row, Col, Card, Button, Progress } from "antd";
import styles from "./patientdash.module.css";

const { Title, Text } = Typography;

export default function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <Card className={styles.welcomeCard} variant="outlined">
        <Title level={3}>Welcome back, John!</Title>
        <Text>Your next appointment is in 2 days with Dr. Sarah Johnson</Text>
      </Card>

      <Row gutter={[24, 24]} className={styles.rowSpacing}>
        <Col xs={24} md={12}>
          <Card title="Quick Actions" variant="outlined">
            <div className={styles.quickActions}>
              <Button type="primary" size="large" block>
                Book New Appointment
              </Button>
              <Button size="large" block>
                Update profile
              </Button>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Health Stats" variant="outlined">
            <div className={styles.statBlock}>
              <div className={styles.statLabel}>
                <Text>Recent Appointments: 3</Text>
              </div>
              <Progress percent={75} strokeColor="#52c41a" showInfo={false} />
            </div>
            <div className={styles.statBlock}>
              <div className={styles.statLabel}>
                <Text>Upcoming Appointments: 2</Text>
              </div>
              <Progress percent={50} strokeColor="#faad14" showInfo={false} />
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title="Upcoming Appointments"
        className={styles.upcomingCard}
        variant="outlined"
      >
        <div className={styles.appointmentList}>
          <AppointmentCard
            id="1"
            doctorInitials="SJ"
            doctorName="Dr. Sarah Johnson"
            specialty="Cardiologist"
            date="Friday, Apr 11, 2025"
            time="10:30 AM"
            status="confirmed"
          />
          <AppointmentCard
            id="2"
            doctorInitials="MP"
            doctorName="Dr. Michael Peterson"
            specialty="Dermatologist"
            date="Monday, Apr 14, 2025"
            time="2:00 PM"
            status="pending"
          />
        </div>
      </Card>
    </div>
  );
}

interface AppointmentCardProps {
  id: string;
  doctorInitials: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctorInitials,
  doctorName,
  specialty,
  date,
  time,
  status,
}) => {
  return (
    <div className={styles.appointmentCard}>
      <div className={styles.appointmentInfo}>
        <div className={styles.initialsCircle}>{doctorInitials}</div>
        <div>
          <div className={styles.doctorName}>{doctorName}</div>
          <div className={styles.details}>
            {specialty} • {date} • {time}
          </div>
        </div>
      </div>
      <div>
        {status === "confirmed" && (
          <span className={styles.statusConfirmed}>Confirmed</span>
        )}
        {status === "pending" && (
          <span className={styles.statusPending}>Pending</span>
        )}
        {status === "cancelled" && (
          <span className={styles.statusCancelled}>Cancelled</span>
        )}
      </div>
    </div>
  );
};
