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
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  usePatientActions,
  usePatientState,
} from "@/providers/paitient-provider";
import { useUserActions } from "@/providers/users-provider";
import { UpdatePatientDto } from "@/providers/paitient-provider/models";
import { ReflistConMethod } from "../../../models/enums/ReflistConMethod";

const { Title } = Typography;
const { Option } = Select;

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
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
      const data: UpdatePatientDto = {
        id: currentPatient.id, // still stored internally for updating
        name: currentPatient.user.name,
        surname: currentPatient.user.surname,
        emailAddress: currentPatient.user.emailAddress,
        phoneNumber: currentPatient.phoneNumber,
        userName: currentPatient.user.userName,
        password: "",
        title: currentPatient.title,
        address: currentPatient.address,
        city: currentPatient.city,
        province: currentPatient.province,
        postalCode: currentPatient.postalCode,
        country: currentPatient.country,
        preferredContactMethod: currentPatient.preferredContactMethod,
      };
      setFormValues(data);
      form.setFieldsValue(data);
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
    try {
      const values = await form.validateFields();
      if (!formValues?.id) return;
      await updatePatient(formValues.id, {
        ...formValues,
        ...values,
      });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <div>
      <Title level={2}>Profile</Title>
      <Card>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {/* Avatar showing first initial */}
          <Avatar
            size={100}
            style={{ backgroundColor: "#1890ff", fontSize: 36 }}
          >
            {formValues?.name?.charAt(0).toUpperCase() || <UserOutlined />}
          </Avatar>
          {/* Full name displayed below the avatar */}
          <div style={{ marginTop: 12, fontSize: 18, fontWeight: 500 }}>
            {formValues?.name} {formValues?.surname}
          </div>
        </div>

        {loading || !formValues ? (
          <Spin spinning tip="Loading patient data..." />
        ) : (
          <Form
            form={form}
            layout="vertical"
            onValuesChange={(changedValues) =>
              setFormValues({ ...formValues, ...changedValues })
            }
          >
            <Row gutter={24}>
              {/* Left column */}
              <Col xs={24} md={12}>
                <Form.Item label="Full Name" name="name">
                  <Input />
                </Form.Item>

                <Form.Item label="Surname" name="surname">
                  <Input />
                </Form.Item>

                <Form.Item label="Email Address" name="emailAddress">
                  <Input />
                </Form.Item>

                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input />
                </Form.Item>

                <Form.Item label="Username" name="userName">
                  <Input />
                </Form.Item>

                <Form.Item label="Password" name="password">
                  <Input.Password placeholder="Enter new password (optional)" />
                </Form.Item>
              </Col>

              {/* Right column */}
              <Col xs={24} md={12}>
                <Form.Item label="Title" name="title">
                  <Input />
                </Form.Item>

                <Form.Item label="Address" name="address">
                  <Input />
                </Form.Item>

                <Form.Item label="City" name="city">
                  <Input />
                </Form.Item>

                <Form.Item label="Province" name="province">
                  <Input />
                </Form.Item>

                <Form.Item label="Postal Code" name="postalCode">
                  <Input />
                </Form.Item>

                <Form.Item label="Country" name="country">
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Preferred Contact Method"
                  name="preferredContactMethod"
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
              </Col>
            </Row>

            <Divider />

            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" onClick={updatePatientProfile}>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
