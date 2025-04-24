import React from "react";
import { Card, Typography, Progress } from "antd";
import styles from "../../app/provider-dashboard/providerdashdash.module.css";
import { Appointment } from "./models"; // Updated import path
const { Text } = Typography;

interface PracticeStatsProps {
  todayAppointments: Appointment[];
  weekAppointments: Appointment[];
}

export const PracticeStats: React.FC<PracticeStatsProps> = ({
  todayAppointments,
  weekAppointments,
}) => {
  // Calculate weekly schedule percentage
  const maxWeeklyAppointments = 30; // Assuming a max of 30 appointments per week
  const weeklyPercentage = Math.min(
    Math.round((weekAppointments.length / maxWeeklyAppointments) * 100),
    100
  );

  return (
    <Card title="Practice Stats" variant="outlined">
      <div className={styles.statBlock}>
        <div className={styles.statLabel}>
          <Text>Today&apos;s Appointments: {todayAppointments.length}</Text>
        </div>
        <Progress
          percent={Math.min(todayAppointments.length * 20, 100)}
          strokeColor="#52c41a"
          showInfo={false}
        />
      </div>
      <div className={styles.statBlock}>
        <div className={styles.statLabel}>
          <Text>Week&apos;s Schedule: {weeklyPercentage}% Full</Text>
        </div>
        <Progress
          percent={weeklyPercentage}
          strokeColor="#faad14"
          showInfo={false}
        />
      </div>
    </Card>
  );
};

export default PracticeStats;
