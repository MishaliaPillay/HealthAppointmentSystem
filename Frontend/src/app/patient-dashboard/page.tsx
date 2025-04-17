"use client";
import {
  Typography,
  Row,
  Col,
  Card,
  Button,
  Progress,
  Modal,
  Spin,
} from "antd";
import styles from "./patientdash.module.css";
import BookingModule from "../../components/booking/booking";
import { useState, useEffect } from "react";
import { User } from '@/interfaces/types';
import {
  useUserState,
  useUserActions,
} from "../../providers/users-provider/index";

const { Title, Text } = Typography;

export default function Dashboard() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentPatient, user, isPending, isError, isSuccess } =
    useUserState();
  const { getCurrentUser, getCurrentPatient } = useUserActions();

  const handleOpenBookingModal = () => {
    setShowBookingModal(true);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
  };
 const token = sessionStorage.getItem("jwt");
  useEffect(() => {
    if (isPending) {
      setLoading(true);
    }
    if (isError) {
   
    }

    // if (isSuccess || user.id) {
    //   // console.log("when does it get here!!!");
    //   //  getCurrentPatient(user.id);
    //   getCurrentPatient()
    // }

    if (isSuccess || token) {
      // console.log("when does it get here!!!");
      //  getCurrentPatient(user.id);
      getCurrentPatient(token);
    }
  }, []);

  // isSuccess, isPending, isError, getCurrentPatient(user.id), user.id;
  if (loading || isPending) {
    return <Spin spinning tip="Loading patient data..." />;
  }

  if (isError || !currentPatient) {
    return <p>Failed to load patient data. Please try again.</p>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Card className={styles.welcomeCard} variant="outlined">
        <Title level={3}>Welcome back, {user.currentPatient.title}!</Title>
        {/* <Text>
          Your next appointment is with Dr.{" "}
          {currentPatient.appointments?.[0]?.doctorName || "TBD"}
        </Text>  */}
      </Card>

      {/* <Row gutter={[24, 24]} className={styles.rowSpacing}>
        <Col xs={24} md={12}>
          <Card title="Quick Actions" variant="outlined">
            <div className={styles.quickActions}>
              <Button
                type="primary"
                size="large"
                block
                onClick={handleOpenBookingModal}
              >
                Book New Appointment
              </Button>
              <Button size="large" block>
                Update Profile
              </Button>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Health Stats" variant="outlined">
            <div className={styles.statBlock}>
              <div className={styles.statLabel}>
                <Text>
                  Recent Appointments:{" "}
                  {currentPatient.appointments?.length || 0}
                </Text>
              </div>
              <Progress
                percent={
                  (currentPatient.appointments?.length /
                    currentPatient.MaxAppointmentsPerDay) *
                    100 || 0
                }
                strokeColor="#52c41a"
                showInfo={false}
              />
            </div>
            <div className={styles.statBlock}>
              <div className={styles.statLabel}>
                <Text>Upcoming Appointments: 2</Text>
              </div>
              <Progress percent={50} strokeColor="#faad14" showInfo={false} />
            </div>
          </Card>
        </Col>
      </Row> */}
      {/* 
      <Card
        title="Upcoming Appointments"
        className={styles.upcomingCard}
        variant="outlined"
      >
        <div className={styles.appointmentList}>
          {currentPatient.appointments?.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              doctorInitials={appointment.doctorInitials}
              doctorName={appointment.doctorName}
              specialty={appointment.specialty}
              date={appointment.date}
              time={appointment.time}
              status={appointment.status}
            />
          )) || <Text>No upcoming appointments.</Text>}
        </div>
      </Card> */}

      {/* Booking Modal */}
      <Modal
        title="Book an Appointment"
        open={showBookingModal}
        onCancel={handleCloseBookingModal}
        width={800}
        footer={null}
      >
        <BookingModule showButton={false} onClose={handleCloseBookingModal} />
      </Modal>
    </div>
  );
}
