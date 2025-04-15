// DateStep.tsx
import React, { useState } from "react";
import { Typography, Card, Row, Col, Badge } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useStyles } from "../styles";

const { Title } = Typography;

interface DateStepProps {
  dates: string[];
  onSelect: (date: string) => void;
  onBack: () => void;
}

export const DateStep: React.FC<DateStepProps> = ({
  dates,
  onSelect,
  onBack,
}) => {
  const { styles } = useStyles();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Format the date to display parts separately
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
      full: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    };
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    onSelect(date);
  };

  return (
    <div>
      <div className={styles.backButton} onClick={onBack}>
        <LeftOutlined /> Back to Doctors
      </div>

      <Title level={4}>Select Available Date</Title>
      <Row gutter={[16, 16]}>
        {dates.slice(0, 12).map((date) => {
          const formattedDate = formatDate(date);
          const isToday =
            new Date(date).toDateString() === new Date().toDateString();
          const isSelected = date === selectedDate;

          return (
            <Col key={date} xs={12} sm={8} md={6}>
              <Card
                hoverable
                onClick={() => handleDateSelect(date)}
                className={`${styles.dateCard} ${isSelected ? "selected" : ""}`}
              >
                {isToday && <Badge.Ribbon text="Today" color="green" />}
                <div className={styles.dateDay}>{formattedDate.weekday}</div>
                <div className={styles.dateNumber}>{formattedDate.day}</div>
                <div>{formattedDate.month}</div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
