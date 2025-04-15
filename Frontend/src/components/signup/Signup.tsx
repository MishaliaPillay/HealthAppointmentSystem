"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Select,
  RadioChangeEvent,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import styles from "../../app/login/login-page.module.css";

const { Option } = Select;

interface SignupFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  userType: "patient" | "doctor";
  specialty?: string;
  agreeToTerms: boolean;
}

interface SignupFormProps {
  className?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  showSocialLogin?: boolean;
}

export default function SignupForm({ className, onSuccess }: SignupFormProps) {
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [password, setPassword] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinishSignup = async (values: SignupFormValues) => {
    setLoading(true);
    try {
      // Replace with your actual API call to register the user
      console.log("Signup data:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      messageApi.success({
        content: "Account created successfully!",
        duration: 3,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Signup error:", error);
      messageApi.error({
        content: "Failed to create account. Please try again.",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordChecks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[@$!%*?&]/.test(password),
  };

  const medicalSpecialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology",
    "Hematology",
    "Infectious Disease",
    "Internal Medicine",
    "Nephrology",
    "Neurology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Surgery",
    "Urology",
  ];

  const handleUserTypeChange = (e: RadioChangeEvent) => {
    setUserType(e.target.value);
  };

  return (
    <div className={`${styles.formContainer} ${className || ""}`}>
      {contextHolder}

      <Form
        name="signup"
        onFinish={onFinishSignup}
        size="large"
        layout="vertical"
        className={styles.form}
        initialValues={{ userType: "patient" }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <div style={{ position: "relative" }}>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              onChange={(e) => {
                setPassword(e.target.value);
                setShowTooltip(e.target.value.length > 0);
              }}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "#fff",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  width: "100%",
                  zIndex: 10,
                }}
              >
                <p>Password must contain:</p>
                {Object.entries(passwordChecks).map(([key, valid]) => (
                  <p
                    key={key}
                    style={{
                      color: valid ? "green" : "red",
                      marginBottom: 4,
                    }}
                  >
                    {valid ? (
                      <CheckCircleOutlined style={{ color: "green" }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: "red" }} />
                    )}
                    {key === "length" && " At least 8 characters"}
                    {key === "lowercase" && " At least one lowercase letter"}
                    {key === "uppercase" && " At least one uppercase letter"}
                    {key === "number" && " At least one number"}
                    {key === "specialChar" &&
                      " At least one special character (!@#$%^&*)"}
                  </p>
                ))}
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item
          name="userType"
          label="I am a:"
          rules={[
            { required: true, message: "Please select your account type!" },
          ]}
        >
          <Radio.Group onChange={handleUserTypeChange} value={userType}>
            <Radio value="patient">Patient</Radio>
            <Radio value="doctor">Doctor</Radio>
          </Radio.Group>
        </Form.Item>

        {userType === "doctor" && (
          <Form.Item
            name="specialty"
            label="Medical Specialty"
            rules={[
              { required: true, message: "Please select your specialty!" },
            ]}
          >
            <Select
              placeholder="Select your specialty"
              prefix={<MedicineBoxOutlined />}
            >
              {medicalSpecialties.map((specialty) => (
                <Option key={specialty} value={specialty}>
                  {specialty}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="agreeToTerms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("You must agree to the terms and conditions")
                    ),
            },
          ]}
        >
          <Checkbox>
            I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            loading={loading}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
