"use client";
import { useState} from 'react';
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
  message
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import styles from "./login-page.module.css";
import { IAuth, ILoginResquest } from '@/providers/auth-provider/models';
import { useAuthActions } from '@/providers/auth-provider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInError, signInSuccess } from '@/providers/auth-provider/actions';
import { useRouter } from 'next/navigation';
const { Title } = Typography;
const { Option } = Select;

message.config({
  top: 50, // Distance from the top of the page in pixels
  duration: 5, // Default duration in seconds
});


interface LoginSignupProps {
  className?: string; //if we want to style
}

export default function LoginSignup({ className }: LoginSignupProps) {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [Loading, setLoading] = useState(false);
  const { signUp,signIn} =useAuthActions();
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [password, setPassword] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  //   // try{
  //   //   setLoading(true);
  //   //   await signIn(values)
  //   //   console.log("Login success:", values);
  //   //   // isPending()
  //   //   if(signInSuccess==true){
  //   //     toast.success('Welcome Back You have logged in successfully', {
  //   //       position: "top-right",
  //   //       autoClose: 5000,
  //   //       hideProgressBar: false,
  //   //       closeOnClick: true,
  //   //       pauseOnHover: true,
  //   //       draggable: true,
  //   //       progress: undefined,
  //   //   });
  //   //   }
  //   // }
  //   // catch{
  //   //   if(signInError==true){
  //   //     toast.error('Sorry we couldnt log you in', {
  //   //       position: "top-right",
  //   //       autoClose: 5000,
  //   //       hideProgressBar: false,
  //   //       closeOnClick: true,
  //   //       pauseOnHover: true,
  //   //       draggable: true,
  //   //       progress: undefined,
  //   //   });
  //   //   }
  //   // }
    

  // };
  const onFinishLogin = async (values: ILoginResquest) => {
    setLoading(true);
    try {
      await signIn(values);
      if(signInSuccess==true){
        toast.success('Your signup was successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      router.push("/patient-dashboard");
      }
    } catch (error) {
      if(signInError==true){
        console.error("Signup error:", error);
        toast.success('Your signup was successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      }); 
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishSignup = async (values: IAuth) => {
    setLoading(true);
    try {
      const authPayload: IAuth = userType === "patient"
        ? {
          ...values,
          role:"PATIENT"
          }
        : {
          ...values,
          role:"PROVIDER"
          };
      await signUp(authPayload);
      if(signInSuccess==true){
        toast.success('Your signup was successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
        //switch to login tab when successful signup
        setActiveTab("login")
        console.log("Signup success:", authPayload);
      }
    } catch (error) {
      if(signInError==true){
        console.error("Signup error:", error);
        toast.success('Your signup was successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      }); 
      }
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
      initialValues={{ userType: "patient" }}
    >
      {/* User Type Selection - Moved to the top */}
      <Form.Item
        name="userType"
        label="I am a:"
        rules={[{ required: true, message: "Please select your account type!" }]}
      >
        <Radio.Group onChange={handleUserTypeChange} value={userType}>
          <Radio value="patient">Patient</Radio>
          <Radio value="doctor">Doctor</Radio>
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
        name="UserName"
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
      {userType === "patient" && (
        <>
          <Form.Item
            name="dateOfBirth"
            rules={[{ required: true, message: "Please input your date of birth!" }]}
          >
            <DatePicker placeholder="Date of Birth" style={{ width: "100%" }} />
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
            rules={[{ required: true, message: "Please input your postal code!" }]}
          >
            <Input placeholder="Postal Code" />
          </Form.Item>

          <Form.Item
            name="country"
            rules={[{ required: true, message: "Please input your country!" }]}
          >
            <Input placeholder="Country" />
          </Form.Item>
        </>
      )}

      {userType === "doctor" && (
        <>
          <Form.Item
            name="Biography"
            rules={[{ required: true, message: "Please input your biography!" }]}
          >
            <Input.TextArea placeholder="Biography" rows={4} />
          </Form.Item>

          <Form.Item
            name="YearsOfExperience"
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
            name="MaxAppointmentsPerDay"
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
          <Form.Item
            name="Qualification"
            rules={[{ required: true, message: "Please input your qualification!" }]}
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
    <Spin spinning={Loading} tip="Please hold on we are are signing you up...">
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
