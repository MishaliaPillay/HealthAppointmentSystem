"use client";

import { Typography, Spin, Row, Col, Card, Progress } from "antd";
import {
  BulbOutlined,
  UserOutlined,
  CalendarOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

import styles from "./patientdash.module.css";
import { useState, useEffect, useRef } from "react";
import {
  usePatientActions,
  usePatientState,
} from "@/providers/paitient-provider";
import { useUserState } from "@/providers/users-provider";
import withAuth from "../../hoc/withAuth";

function Dashboard() {
  const didFetchRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const { currentPatient } = usePatientState();
  const { currentUser } = useUserState();
  const { getCurrentPatient } = usePatientActions();

  useEffect(() => {
    const fetchData = async () => {
      if (!didFetchRef.current && currentPatient === undefined && currentUser) {
        didFetchRef.current = true;
        setLoading(true);
        try {
          await getCurrentPatient(currentUser.id);
        } finally {
          setLoading(false);
        }
      } else if (currentPatient?.user?.name) {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser, currentPatient]);

  if (loading || !currentPatient?.user?.name) {
    return (
      <div className={styles.loadingScreen}>
        <Spin tip="Loading your dashboard..." size="large" />
      </div>
    );
  }

  const appointmentCount = currentPatient?.appointments?.length || 0;

  return (
    <div className={styles.dashboardContainer}>
      <Card className={styles.welcomeCard} bordered={false}>
        <Title level={2} className={styles.dashboardTitle}>
          🌍 Welcome back,{" "}
          <span className={styles.userName}>{currentPatient.user.name}</span>
        </Title>
        <Paragraph className={styles.subtitle}>
          Your wellness journey matters. Book, track, and stay in tune with your
          health.
        </Paragraph>
      </Card>

      <Row gutter={[24, 24]} className={styles.rowSpacing}>
        {/* Appointment Summary */}
        <Col xs={24} md={12}>
          <Card title={null} bordered={false} className={styles.statCard}>
            <Title level={4} className={styles.cardTitle}>
              📅 Your Appointments
            </Title>
            <Text className={styles.statLabel}>
              Total Booked:{" "}
              <strong className={styles.tealText}>{appointmentCount}</strong>
            </Text>
            <Progress
              percent={
                appointmentCount * 10 > 100 ? 100 : appointmentCount * 10
              }
              strokeColor="var(--teal-600)"
            />
          </Card>
        </Col>

        {/* Health Tips */}
        <Col xs={24} md={12}>
          <Card title={null} bordered={false} className={styles.tipCard}>
            <Title level={4} className={styles.cardTitle}>
              💡 Health Tips
            </Title>
            <Paragraph>
              <BulbOutlined className={styles.bulbIcon} /> Drink plenty of water
              daily — hydration boosts energy and focus.
            </Paragraph>
            <Paragraph>
              <BulbOutlined className={styles.bulbIcon} /> Include more fiber in
              your diet for better digestion.
            </Paragraph>
            <Paragraph>
              <BulbOutlined className={styles.bulbIcon} /> Aim for 7–9 hours of
              quality sleep to recharge your body.
            </Paragraph>
            <Paragraph>
              <BulbOutlined className={styles.bulbIcon} /> Take a 10-minute walk
              after meals to support blood sugar levels.
            </Paragraph>
          </Card>
        </Col>

        {/* Wellness Cards */}
        <Col xs={24} md={12}>
          <Card
            title="🧘 Mental Wellness"
            bordered={false}
            className={styles.infoCard}
          >
            <Paragraph>
              Practice mindfulness or deep breathing for 5 minutes to reduce
              stress.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="🍏 Nutrition Insight"
            bordered={false}
            className={styles.infoCard}
          >
            <Paragraph>
              Include lean proteins, fruits, and vegetables in your meals for
              balanced health.
            </Paragraph>
          </Card>
        </Col>

        {/* Feature Steps */}
        <Col xs={24}>
          <Card
            title="📘 How HealthConnect Works"
            bordered={false}
            className={styles.stepCard}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Card bordered className={styles.stepItem}>
                  <UserOutlined className={styles.stepIcon} />
                  <Title level={4}>Create Account</Title>
                  <Text>
                    Sign up and complete your health profile in minutes.
                  </Text>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card bordered className={styles.stepItem}>
                  <CalendarOutlined className={styles.stepIcon} />
                  <Title level={4}>Book Appointment</Title>
                  <Text>
                    Select a convenient time slot from available options.
                  </Text>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card bordered className={styles.stepItem}>
                  <VideoCameraOutlined className={styles.stepIcon} />
                  <Title level={4}>Emotion Detection</Title>
                  <Text>
                    AI-powered analysis to understand your emotional state.
                  </Text>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withAuth(Dashboard);
