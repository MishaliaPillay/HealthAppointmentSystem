// DoctorProfileModal.tsx
import React from "react";
import { Modal, Typography, Avatar, Rate, Divider, Button } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Doctor, Specialty, Facility } from "./types";

const { Title, Text, Paragraph } = Typography;

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  specialties: Specialty[];
  facilities: Facility[];
  visible: boolean;
  onClose: () => void;
  onSelect: (doctor: Doctor) => void;
}

const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  specialties,
  facilities,
  visible,
  onClose,
  onSelect,
}) => {
  if (!doctor) return null;

  const specialty = specialties.find((s) => s.id === doctor.specialty);
  const facility = facilities.find((f) => f.id === doctor.facilityId);

  return (
    <Modal
      title="Doctor Profile"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <div style={{ display: "flex", marginBottom: 24 }}>
        <Avatar src={doctor.image} size={80} />
        <div style={{ marginLeft: 16 }}>
          <Title level={4} style={{ margin: 0 }}>
            {doctor.name}
          </Title>
          <Text type="secondary">{specialty?.name}</Text>
          <div style={{ marginTop: 8 }}>
            <Rate
              allowHalf
              disabled
              defaultValue={doctor.rating}
              style={{ fontSize: 16 }}
            />
            <Text style={{ marginLeft: 8 }}>{doctor.rating}</Text>
          </div>
        </div>
      </div>

      <Divider />

      <div style={{ marginBottom: 16 }}>
        <Title level={5}>About</Title>
        <Paragraph>{doctor.bio}</Paragraph>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Title level={5}>Location</Title>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EnvironmentOutlined style={{ marginRight: 8 }} />
          <Text>{facility?.name}</Text>
        </div>
      </div>

      <Button
        type="primary"
        block
        onClick={() => {
          onSelect(doctor);
          onClose();
        }}
      >
        Select This Doctor
      </Button>
    </Modal>
  );
};

export default DoctorProfileModal;
