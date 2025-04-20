"use client";
import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Tabs,
  Typography,
  Radio,
  Select,
  DatePicker,
  RadioChangeEvent,
  Spin,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import styles from "./login-page.module.css";
import { IAuth, ISignInRequest } from "@/providers/auth-provider/models";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, usePathname } from "next/navigation";
import { getRole } from "@/utils/decoder";
import { useUserActions } from "@/providers/users-provider";
import { usePatientActions } from "@/providers/paitient-provider";

const { Title } = Typography;
const { Option } = Select;

interface LoginSignupProps {
  className?: string;
}

export default function LoginSignup({ className }: LoginSignupProps) {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [Loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuthActions();
  const { isError, isSuccess } = useAuthState();
  const [role, setrole] = useState<"patient" | "provider">("patient");
  const [password, setPassword] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { getCurrentUser } = useUserActions();
  const { getCurrentPatient } = usePatientActions();

  // Turn off loader after navigation
  useEffect(() => {
    if (Loading) {
      setLoading(false);
    }
  }, [pathname]);

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

  const handleroleChange = (e: RadioChangeEvent) => {
    setrole(e.target.value);
  };

  const onFinishLogin = async (values: ISignInRequest) => {
    try {
      setLoading(true);
      const access = await signIn(values);
      const accessToken = access.result.accessToken;

      sessionStorage.setItem("jwt", accessToken);

      const role = getRole(accessToken);
      const user = await getCurrentUser(accessToken);

      if (role === "patient") {
        await getCurrentPatient(user.id);
        router.push("/patient-dashboard");
      } else if (role === "provider") {
        router.push("/provider-dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login error", err);
      toast.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  const onFinishSignup = async (values: IAuth) => {
    try {
      setLoading(true);
      const authPayload: IAuth = {
        ...values,
        role,
      };

      await signUp(authPayload);

      if (isSuccess) {
        setActiveTab("login");
      }
    } catch (error) {
      if (isError) {
        console.error("Signup error:", error);
        toast.error("Signup failed. Please check your inputs.");
      }
    } finally {
      setLoading(false);
    }
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
        name="userNameOrEmailAddress"
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
                  style={{ color: valid ? "green" : "red", marginBottom: 4 }}
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
      initialValues={{ role: "patient" }}
    >
      <Form.Item
        name="role"
        label="I am a:"
        rules={[
          { required: true, message: "Please select your account type!" },
        ]}
      >
        <Radio.Group onChange={handleroleChange} value={role}>
          <Radio value="patient">Patient</Radio>
          <Radio value="provider">Medical practitioner</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="title" rules={[{ required: true }]}>
        <Select placeholder="Select your title">
          <Option value="Mr">Mr</Option>
          <Option value="Ms">Ms</Option>
          <Option value="Dr">Dr</Option>
          <Option value="Miss">Miss</Option>
        </Select>
      </Form.Item>

      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item name="surname" rules={[{ required: true }]}>
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        name="emailAddress"
        rules={[{ required: true, type: "email" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="phoneNumber" rules={[{ required: true }]}>
        <Input placeholder="Phone Number" />
      </Form.Item>

      <Form.Item name="userName" rules={[{ required: true }]}>
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, min: 8 }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>

      {role === "patient" && (
        <>
          <Form.Item name="dateOfBirth" rules={[{ required: true }]}>
            <DatePicker placeholder="Date of Birth" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="address" rules={[{ required: true }]}>
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item name="city" rules={[{ required: true }]}>
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item name="province" rules={[{ required: true }]}>
            <Input placeholder="Province" />
          </Form.Item>
          <Form.Item name="postalCode" rules={[{ required: true }]}>
            <Input placeholder="Postal Code" />
          </Form.Item>
          <Form.Item name="country" rules={[{ required: true }]}>
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item name="preferredContactMethod" rules={[{ required: true }]}>
            <Select placeholder="Preferred Contact Method">
              <Option value={1}>Email</Option>
              <Option value={2}>SMS</Option>
            </Select>
          </Form.Item>
        </>
      )}

      {role === "provider" && (
        <>
          <Form.Item name="biography" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Biography" rows={4} />
          </Form.Item>
          <Form.Item name="yearsOfExperience" rules={[{ required: true }]}>
            <Input placeholder="Years of Experience" type="number" />
          </Form.Item>
          <Form.Item name="maxAppointmentsPerDay" rules={[{ required: true }]}>
            <Input placeholder="Max Appointments Per Day" type="number" />
          </Form.Item>
          <Form.Item name="specialty" rules={[{ required: true }]}>
            <Select placeholder="Select your specialty">
              {medicalSpecialties.map((specialty) => (
                <Option key={specialty} value={specialty}>
                  {specialty}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="qualification" rules={[{ required: true }]}>
            <Input placeholder="Qualification" />
          </Form.Item>
        </>
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
    <Spin spinning={Loading} tip="Please Hold on...">
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
    </Spin>
  );
}
