"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Card,
  Avatar,
  Row,
  Col,
  Spin,
  Select,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  usePatientActions,
  usePatientState,
} from "@/providers/paitient-provider";
import { useUserActions } from "@/providers/users-provider";
import {
  UpdatePatientDto,
} from "@/providers/paitient-provider/models";
import {  ReflistConMethod}  from "../../../models/enums/ReflistConMethod"
const { Title } = Typography;
const { Option } = Select;

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<UpdatePatientDto | null>(null);

  const { isPending, isError, isSuccess, currentPatient } = usePatientState();
  const { getCurrentUser } = useUserActions();
  const { getCurrentPatient, updatePatient } = usePatientActions();

  useEffect(() => {
    fetchPatientOnReload();
  }, []);

  useEffect(() => {
    setLoading(isPending);
    if (isError || isSuccess) setLoading(false);
  }, [isPending, isError, isSuccess]);

  useEffect(() => {
    if (currentPatient) {
      setFormValues({
        id: currentPatient?.id,
        name: currentPatient?.user.name,
        surname: currentPatient?.user.surname,
        emailAddress: currentPatient?.user.emailAddress,
        phoneNumber: currentPatient?.phoneNumber,
        userName: currentPatient?.user.userName,
        password: "",
        title: currentPatient?.title,
        address: currentPatient?.address,
        city: currentPatient?.city,
        province: currentPatient?.province,
        postalCode: currentPatient?.postalCode,
        country: currentPatient?.country,
        preferredContactMethod: currentPatient?.preferredContactMethod,
      });
    }
  }, [currentPatient]);

  const fetchPatientOnReload = async (): Promise<void> => {
    const token = sessionStorage.getItem("jwt");
    if (!token) return;

    try {
      setLoading(true);
      const user = await getCurrentUser(token);
      await getCurrentPatient(user.id);
    } catch (err) {
      console.error("Error fetching patient data:", err);
    } finally {
      setLoading(false);
    }
  };

  const updatePatientProfile = async () => {
    if (!formValues || !currentPatient.id) return;
    const patientDataToSend = { ...formValues };
    delete patientDataToSend.id;
    await updatePatient(currentPatient.id, formValues);
  };

  return (
    <div>
      <Title level={2}>Profile</Title>
      <Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div style={{ textAlign: "center" }}>
              <Avatar size={100} icon={<UserOutlined />} />
            </div>
          </Col>
          <Col xs={24} md={16}>
            {loading || !formValues ? (
              <Spin spinning tip="Loading patient data..." />
            ) : (
              <Form
                layout="vertical"
                onValuesChange={(changedValues) =>
                  setFormValues({ ...formValues, ...changedValues })
                }
              >
                <Form.Item label="ID" name="id" initialValue={formValues?.id}>
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label="Full Name"
                  name="name"
                  initialValue={formValues?.name}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Surname"
                  name="surname"
                  initialValue={formValues?.surname}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email Address"
                  name="emailAddress"
                  initialValue={formValues?.emailAddress}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  initialValue={formValues?.phoneNumber}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Username"
                  name="userName"
                  initialValue={formValues?.userName}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <Input.Password placeholder="Enter new password (optional)" />
                </Form.Item>
                <Form.Item
                  label="Title"
                  name="title"
                  initialValue={formValues?.title}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  initialValue={formValues?.address}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="City"
                  name="city"
                  initialValue={formValues?.city}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Province"
                  name="province"
                  initialValue={formValues?.province}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Postal Code"
                  name="postalCode"
                  initialValue={formValues?.postalCode}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Country"
                  name="country"
                  initialValue={formValues?.country}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Preferred Contact Method"
                  name="preferredContactMethod"
                  initialValue={formValues?.preferredContactMethod}
                >
                  <Select
                    onChange={(value) =>
                      setFormValues((prev) => ({
                        ...prev,
                        preferredContactMethod: value,
                      }))
                    }
                  >
                    <Option value={ReflistConMethod.Email}>Email</Option>
                    <Option value={ReflistConMethod.SMS}>SMS</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={updatePatientProfile}>
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;
