"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Tabs,
  Typography,
  Radio,
  Select,
  RadioChangeEvent,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import styles from "./login-page.module.css";

const { Title } = Typography;
const { Option } = Select;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

interface SignupFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  userType: "patient" | "doctor";
  specialty?: string;
  agreeToTerms: boolean;
}

interface LoginSignupProps {
  className?: string; //if we want to style
}

export default function LoginSignup({ className }: LoginSignupProps) {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [password, setPassword] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);

  const onFinishLogin = (values: LoginFormValues) => {
    console.log("Login success:", values);
  };

  const onFinishSignup = (values: SignupFormValues) => {
    console.log("Signup success:", values);
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
  const loginForm = (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinishLogin}
      size="large"
      layout="vertical"
      className={styles.form}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  );

  const signupForm = (
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
                  {key === "length" && "At least 8 characters"}
                  {key === "lowercase" && "At least one lowercase letter"}
                  {key === "uppercase" && "At least one uppercase letter"}
                  {key === "number" && "At least one number"}
                  {key === "specialChar" &&
                    "At least one special character (!@#$%^&*)"}
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
          rules={[{ required: true, message: "Please select your specialty!" }]}
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
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );

  const tabItems = [
    {
      key: "login",
      label: "Login",
      children: loginForm,
    },
    {
      key: "signup",
      label: "Sign Up",
      children: signupForm,
    },
  ];

  return (
    <div className={`${styles.formCard} ${className || ""}`}>
      <Title level={2} className={styles.title}>
        {activeTab === "login" ? "Welcome Back!" : "Create Account"}
      </Title>
      <Title level={4} className={styles.subtitle}>
        {activeTab === "login"
          ? "Log in to connect with healthcare professionals"
          : "Join our platform to connect patients with healthcare professionals"}
      </Title>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        className={styles.tabs}
        items={tabItems}
      />
    </div>
  );
}
