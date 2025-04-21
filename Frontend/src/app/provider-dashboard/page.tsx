"use client";
import {
  Typography,
  Row,
  Col,
  Card,
  Button,
  Progress,
  Avatar,
  Badge,
  Tag,
  Spin,
} from "antd";
import styles from "./providerdashdash.module.css";
import { useEffect, useState } from "react";

import {
  useProviderState,
  useProviderActions,
} from "@/providers/providerMedicPrac-provider";
import { useUserActions} from "@/providers/users-provider";

const { Title, Text } = Typography;

export default function ProviderDashboard() {
  const [loading, setLoading] = useState(true);

  const { currentProvider, isPending, isError } = useProviderState();
  const { getCurrentProvider } = useProviderActions();
  const { getCurrentUser } = useUserActions();
  
  // Fetch user + provider on mount
  useEffect(() => {
    fetchProviderOnReload();
  }, []);

  // Track loading state
  useEffect(() => {
    setLoading(isPending);
    if (isError) setLoading(false);
  }, [isPending, isError]);

  const fetchProviderOnReload = async (): Promise<void> => {
    const token = sessionStorage.getItem("jwt");
    if (!token) return;

    try {
      setLoading(true);
      const user = await getCurrentUser(token);
      await getCurrentProvider(user.id);
    } catch (err) {
      console.error("Error loading provider/user data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !currentProvider) {
    return <Spin spinning tip="Loading provider data..." />;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Card className={styles.welcomeCard} variant="outlined">
        <Title level={3}>
          Welcome back {currentProvider.title} {currentProvider.user?.surname}
        </Title>
        <Text>You have appointments scheduled today</Text>
      </Card>

      <Row gutter={[24, 24]} className={styles.rowSpacing}>
        <Col xs={24} md={12}>
          <Card title="Quick Actions" variant="outlined">
            <div className={styles.quickActions}>
              <Button type="primary" size="large" block>
                View Today&apos;s Schedule
              </Button>
              <Button size="large" block>
                Manage Availability
              </Button>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Practice Stats" variant="outlined">
            <div className={styles.statBlock}>
              <div className={styles.statLabel}>
                <Text>Today&apos;s Appointments: 5</Text>
              </div>
              <Progress percent={50} strokeColor="#52c41a" showInfo={false} />
            </div>
            <div className={styles.statBlock}>
              <div className={styles.statLabel}>
                <Text>Week&apos;s Schedule: 83% Full</Text>
              </div>
              <Progress percent={83} strokeColor="#faad14" showInfo={false} />
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        title="Today's Appointments"
        className={styles.upcomingCard}
        variant="outlined"
        extra={<Button type="link">View All</Button>}
      >
        <div className={styles.appointmentList}>
          {/* Hardcoded example appointments */}
          <PatientAppointmentCard
            id="1"
            patientInitials="JD"
            patientName="John Doe"
            visitReason="Annual Checkup"
            date="Friday, Apr 11, 2025"
            time="9:00 AM"
            status="checked-in"
            isNewPatient={false}
          />
          <PatientAppointmentCard
            id="2"
            patientInitials="AL"
            patientName="Amy Lee"
            visitReason="Follow-up Consultation"
            date="Friday, Apr 11, 2025"
            time="10:30 AM"
            status="scheduled"
            isNewPatient={true}
          />
        </div>
      </Card>

      <Row gutter={[24, 24]} className={styles.rowSpacing}>
        <Col xs={24} md={12}>
          <Card
            title="Pending Actions"
            variant="outlined"
            extra={<Badge count={3} />}
          >
            <div className={styles.actionsList}>
              <div className={styles.actionItem}>
                <Text strong>Medical Records Review</Text>
                <Text type="secondary">2 pending</Text>
              </div>
              <div className={styles.actionItem}>
                <Text strong>Prescription Renewals</Text>
                <Text type="secondary">1 pending</Text>
              </div>
              <div className={styles.actionItem}>
                <Text strong>Test Results</Text>
                <Text type="secondary">3 to review</Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Recent Patient Notes"
            variant="outlined"
            extra={<Button type="link">View All</Button>}
          >
            <div className={styles.notesList}>
              <div className={styles.noteItem}>
                <div className={styles.noteHeader}>
                  <Avatar size="small">JD</Avatar>
                  <Text strong>John Doe</Text>
                  <Text type="secondary">10:15 AM</Text>
                </div>
                <Text>Updated treatment plan for hypertension...</Text>
              </div>
              <div className={styles.noteItem}>
                <div className={styles.noteHeader}>
                  <Avatar size="small">MR</Avatar>
                  <Text strong>Maria Rodriguez</Text>
                  <Text type="secondary">Yesterday</Text>
                </div>
                <Text>Discussed diabetic diet modifications...</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

interface PatientAppointmentCardProps {
  id: string;
  patientInitials: string;
  patientName: string;
  visitReason: string;
  date: string;
  time: string;
  status:
    | "scheduled"
    | "checked-in"
    | "in-progress"
    | "completed"
    | "cancelled";
  isNewPatient: boolean;
}

const PatientAppointmentCard: React.FC<PatientAppointmentCardProps> = ({
  patientInitials,
  patientName,
  visitReason,
  date,
  time,
  status,
  isNewPatient,
}) => {
  return (
    <div className={styles.appointmentCard}>
      <div className={styles.appointmentInfo}>
        <div className={styles.initialsCircle}>{patientInitials}</div>
        <div>
          <div className={styles.patientName}>
            {patientName}
            {isNewPatient && (
              <Tag color="blue" className={styles.newPatientTag}>
                New
              </Tag>
            )}
          </div>
          <div className={styles.details}>
            {visitReason} • {date} • {time}
          </div>
        </div>
      </div>
      <div className={styles.appointmentActions}>
        {status === "scheduled" && (
          <>
            <span className={styles.statusScheduled}>Scheduled</span>
            <Button size="small" type="primary">
              Start
            </Button>
          </>
        )}
        {status === "checked-in" && (
          <>
            <span className={styles.statusCheckedIn}>Checked In</span>
            <Button size="small" type="primary">
              Start
            </Button>
          </>
        )}
        {status === "in-progress" && (
          <>
            <span className={styles.statusInProgress}>In Progress</span>
            <Button size="small">Complete</Button>
          </>
        )}
        {status === "completed" && (
          <span className={styles.statusCompleted}>Completed</span>
        )}
        {status === "cancelled" && (
          <span className={styles.statusCancelled}>Cancelled</span>
        )}
      </div>
    </div>
  );
};
