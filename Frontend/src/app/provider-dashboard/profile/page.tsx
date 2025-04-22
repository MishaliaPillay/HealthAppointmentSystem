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
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  useProviderActions,
  useProviderState,
} from "@/providers/providerMedicPrac-provider";
import { useUserActions } from "@/providers/users-provider";
import { UpdateProvider } from "@/providers/providerMedicPrac-provider/models";

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<UpdateProvider | null>(null);

  const { isPending, isError, isSuccess, currentProvider } = useProviderState();
  const { getCurrentUser } = useUserActions();
  const { getCurrentProvider, updateProvider } = useProviderActions();

  useEffect(() => {
    fetchProviderOnReload();
  }, []);

  useEffect(() => {
    setLoading(isPending);
    if (isError || isSuccess) setLoading(false);
  }, [isPending, isError, isSuccess]);

  useEffect(() => {
    if (currentProvider) {
      const data: UpdateProvider = {
        id: currentProvider.id,
        name: currentProvider.user.name,
        surname: currentProvider.user.surname,
        emailAddress: currentProvider.user.emailAddress,
        phoneNumber: currentProvider.phoneNumber,
        userName: currentProvider.user.userName,
        password: "",
        title: currentProvider.title,
        yearsOfExperience: currentProvider.yearsOfExperience,
        biography: currentProvider.biography,
        qualification: currentProvider.qualification,
      };
      setFormValues(data);
      form.setFieldsValue(data);
    }
  }, [currentProvider]);

  const fetchProviderOnReload = async (): Promise<void> => {
    const token = sessionStorage.getItem("jwt");
    if (!token) return;

    try {
      setLoading(true);
      const user = await getCurrentUser(token);
      await getCurrentProvider(user.id);
    } catch (err) {
      console.error("Error fetching Provider data:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProviderProfile = async () => {
    try {
      const values = await form.validateFields();
      if (!formValues?.id) return;
      await updateProvider(formValues.id, {
        ...formValues,
        ...values,
      });

      // Update form values immediately with new data after successful update
      setFormValues((prev) => ({
        ...prev,
        ...values,
      }));

      // Optionally update the UI right away
      form.setFieldsValue({ ...values });
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
          <Spin spinning tip="Loading Provider data..." />
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

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Password is required!" }]}
                  >
                  <Input.Password placeholder="Enter new password (required)" />
                </Form.Item>
              </Col>

              {/* Right column */}
              <Col xs={24} md={12}>
                <Form.Item label="Title" name="title">
                  <Input />
                </Form.Item>

                <Form.Item label="yearsOfExperience" name="yearsOfExperience">
                  <Input />
                </Form.Item>

                <Form.Item label="biography" name="biography">
                  <Input />
                </Form.Item>

                <Form.Item label="qualification" name="qualification">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" onClick={updateProviderProfile}>
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
