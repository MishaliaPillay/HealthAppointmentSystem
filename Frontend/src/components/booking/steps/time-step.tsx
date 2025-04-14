import React from "react";
import { Typography, Avatar, Button } from "antd";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Doctor, Specialty, Facility, TimeSlot } from "../types";
import { useStyles } from "../styles";

const { Title, Text } = Typography;

interface TimeStepProps {
  doctor: Doctor | null;
  facility: Facility | null;
  date: string | null;
  timeSlots: TimeSlot[];
  specialties: Specialty[];
  selectedTimeSlot: TimeSlot | null;
  onSelect: (timeSlot: TimeSlot) => void;
  onBack: () => void;
}

export const TimeStep: React.FC<TimeStepProps> = ({
  doctor,
  facility,
  date,
  timeSlots,
  specialties,
  selectedTimeSlot,
  onSelect,
  onBack,
}) => {
  const { styles } = useStyles();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className={styles.backButton} onClick={onBack}>
        <LeftOutlined /> Back to Dates
      </div>

      <div className={styles.summaryCard}>
        <Title level={5}>Appointment Summary</Title>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <Avatar size={64} src={doctor?.image} />
          <div style={{ marginLeft: 16 }}>
            <Text strong>{doctor?.name}</Text>
            <div>
              <Text type="secondary">
                {specialties.find((s) => s.id === doctor?.specialty)?.name}
              </Text>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <EnvironmentOutlined style={{ marginRight: 8 }} />
          <Text>{facility?.name}</Text>
        </div>
        <div>
          <CalendarOutlined style={{ marginRight: 8 }} />
          <Text>{formatDate(date)}</Text>
        </div>
      </div>

      <Title level={4}>Select a Time</Title>

      {timeSlots.length > 0 ? (
        <div className={styles.timeSlotGrid}>
          {timeSlots.map((slot) => (
            <Button
              key={slot.id}
              type={selectedTimeSlot?.id === slot.id ? "primary" : "default"}
              onClick={() => onSelect(slot)}
              className={styles.timeSlot}
            >
              <ClockCircleOutlined
                style={{ display: "block", margin: "0 auto 8px" }}
              />
              <Text>{slot.time}</Text>
            </Button>
          ))}
        </div>
      ) : (
        <Text>No available time slots for the selected date.</Text>
      )}
    </div>
  );
};
