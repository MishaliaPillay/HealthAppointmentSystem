import React from "react";
import { Input, Card, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Specialty } from "../types";
import { useStyles } from "../styles";

const { Title } = Typography;

interface SpecialtyStepProps {
  specialties: Specialty[];
  onSelect: (specialtyId: string) => void;
}

export const SpecialtyStep: React.FC<SpecialtyStepProps> = ({
  specialties,
  onSelect,
}) => {
  const { styles } = useStyles();

  // Add General specialty if it doesn't exist
  const allSpecialties = specialties.some((s) => s.name === "General")
    ? specialties
    : [{ id: "general", name: "General" }, ...specialties];

  return (
    <div>
      <Title level={4}>Select a Specialty</Title>
      <Input
        placeholder="Search specialties..."
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16 }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 12,
        }}
      >
        {allSpecialties.map((specialty) => (
          <Card
            key={specialty.id}
            hoverable
            onClick={() => onSelect(specialty.id)}
            className={styles.stepCard}
          >
            <Typography.Text strong style={{ fontSize: 14, margin: 0 }}>
              {specialty.name}
            </Typography.Text>
          </Card>
        ))}
      </div>
    </div>
  );
};
