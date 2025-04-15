import React from "react";
import { Typography, List, Button, Avatar, Rate, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Doctor, Specialty } from "../types";
import { useStyles } from "../styles";

const { Title, Text } = Typography;

interface DoctorStepProps {
  doctors: Doctor[];
  specialties: Specialty[];
  onSelect: (doctor: Doctor) => void;
  onViewProfile: (doctor: Doctor) => void;
  onBack: () => void;
}

export const DoctorStep: React.FC<DoctorStepProps> = ({
  doctors,
  specialties,
  onSelect,
  onViewProfile,
  onBack,
}) => {
  const { styles } = useStyles();

  return (
    <div>
      <div className={styles.backButton} onClick={onBack}>
        <LeftOutlined /> Back to Locations
      </div>

      <Title level={4}>Select a Doctor</Title>
      {doctors.length > 0 ? (
        <List
          dataSource={doctors}
          renderItem={(doctor) => (
            <List.Item className={styles.doctorCard}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: 16,
                }}
              >
                <div className={styles.doctorInfo}>
                  <Avatar src={doctor.image} size={64} />
                  <div style={{ marginLeft: 12 }}>
                    <Text strong>{doctor.name}</Text>
                    <div>
                      <Text type="secondary">
                        {
                          specialties.find((s) => s.id === doctor.specialty)
                            ?.name
                        }
                      </Text>
                    </div>
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={doctor.rating}
                      style={{ fontSize: 14 }}
                    />
                  </div>
                </div>
                <Space>
                  <Button type="link" onClick={() => onViewProfile(doctor)}>
                    View Details
                  </Button>
                  <Button type="primary" onClick={() => onSelect(doctor)}>
                    Select
                  </Button>
                </Space>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Text>
          No doctors available for this specialty at the selected location.
        </Text>
      )}
    </div>
  );
};
