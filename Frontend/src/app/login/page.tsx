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
  MedicineBoxOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "./login-page.module.css";
import { IAuth, ISignInRequest } from "@/providers/auth-provider/models";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";
import { useUserActions } from "@/providers/users-provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { getRole } from "@/utils/decoder";
const { Title } = Typography;
const { Option } = Select;

interface LoginSignupProps {
  className?: string; //if we want to style
}
export default function LoginSignup({ className }: LoginSignupProps) {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [Loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuthActions();
  const { isSuccess, isError, isPending } = useAuthState();
  const [role, setrole] = useState<"patient" | "provider">("patient");
  const [password, setPassword] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();
  const { getCurrentUser } = useUserActions();
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      console.log("token part", token);
    }
    if (true) {
      console.log("there is no token", token);
    }
    if (isPending) {
      setLoading(true);
    }
    if (isError) {
      toast.error("Your signup was unsuccessful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (isSuccess) {
      const role = getRole(token);
      console.log("this is the " + role);
      if (role === "provider") {
        router.push("/provider-dashboard");
      } else if (role === "patient") {
        router.push("/patient-dashboard");
      } else {
        router.push("/");
      }
    }
  }, [isPending, isError, isSuccess, router]);

  const onFinishLogin = async (values: ISignInRequest) => {
    await signIn(values);
    console.log("This is the success in the login button", isSuccess);
    const token = sessionStorage.getItem("jwt");
    getCurrentUser(token);
    
    console.log("current user info,");
  };

  const onFinishSignup = async (values: IAuth) => {
    if (isPending) {
      setLoading(true);
    }
    try {
      const authPayload: IAuth =
        role === "patient"
          ? {
              ...values,
              role: "patient",
            }
          : {
              ...values,
              role: "provider",
            };
      await signUp(authPayload);
      if (isSuccess) {
        setActiveTab("login");
      }
    } catch (error) {
      if (isError) {
        console.error("Signup error:", error);
      }
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

  const handleroleChange = (e: RadioChangeEvent) => {
    setrole(e.target.value);
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
      {/* User Type Selection - Moved to the top */}
      <Form.Item
        name="role"
        label="I am a:"
        rules={[
          { required: true, message: "Please select your account type!" },
        ]}
      >
        <Radio.Group onChange={handleroleChange} value={role}>
          <Radio value="PATIENT">Patient</Radio>
          <Radio value="PROVIDER">Medical practitioner</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Common Fields for Both Patients and Providers */}
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please select your title!" }]}
      >
        <Select placeholder="Select your title">
          <Option value="Mr">Mr</Option>
          <Option value="Ms">Ms</Option>
          <Option value="Dr">Dr</Option>
          <Option value="Miss">Miss</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        name="surname"
        rules={[{ required: true, message: "Please input your surname!" }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        name="emailAddress"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>

      <Form.Item
        name="userName"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 8, message: "Password must be at least 8 characters!" },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      {/* Patient-Specific Fields */}
      {role === "patient" && (
        <>
          <Form.Item
            name="dateOfBirth"
            rules={[
              { required: true, message: "Please input your date of birth!" },
            ]}
          >
            <DatePicker
              placeholder="Date of Birth"
              style={{ width: "100%" }}
              onChange={(date) => {
                dayjs(date).toISOString(); // Format as ISO 8601
              }}
            />
          </Form.Item>

          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input placeholder="City" />
          </Form.Item>

          <Form.Item
            name="province"
            rules={[{ required: true, message: "Please input your province!" }]}
          >
            <Input placeholder="Province" />
          </Form.Item>

          <Form.Item
            name="postalCode"
            rules={[
              { required: true, message: "Please input your postal code!" },
            ]}
          >
            <Input placeholder="Postal Code" />
          </Form.Item>

          <Form.Item
            name="country"
            rules={[{ required: true, message: "Please input your country!" }]}
          >
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item
            name="preferredContactMethod"
            rules={[
              {
                required: true,
                message: "Please select your preferred ContactMethod",
              },
            ]}
          >
            <Select
              placeholder="Please select your preferred ContactMethod"
              onChange={(value) => {
                Number(value);
              }}
            >
              <Option value={1}>Email</Option>
              <Option value={2}>SMS</Option>
            </Select>
          </Form.Item>
        </>
      )}

      {role === "provider" && (
        <>
          <Form.Item
            name="biography"
            rules={[
              { required: true, message: "Please input your biography!" },
            ]}
          >
            <Input.TextArea placeholder="Biography" rows={4} />
          </Form.Item>

          <Form.Item
            name="yearsOfExperience"
            rules={[
              {
                required: true,
                message: "Please input your years of experience!",
              },
            ]}
          >
            <Input placeholder="Years of Experience" type="number" />
          </Form.Item>

          <Form.Item
            name="maxAppointmentsPerDay"
            rules={[
              {
                required: true,
                message: "Please input max appointments per day!",
              },
            ]}
          >
            <Input placeholder="Max Appointments Per Day" type="number" />
          </Form.Item>
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
          <Form.Item
            name="qualification"
            rules={[
              { required: true, message: "Please input your qualification!" },
            ]}
          >
            <Input placeholder="Qualification" />
          </Form.Item>
        </>
      )}

      {/* Agree to Terms */}
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

      {/* Submit Button */}
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
