"use client";
import { useState, useRef, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,

  RadioChangeEvent,
  Spin,
} from "antd";
import debounce from "lodash.debounce";
import dayjs from "dayjs";
import {
  LockOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { IAuth } from "@/providers/auth-provider/models";
import { useAuthActions } from "@/providers/auth-provider";
import { useCheckuserActions } from "@/providers/check-user-provider";
import { RuleObject } from "antd/lib/form"; // Import RuleObject from Ant Design

import styles from "../../app/page.module.css";
const specialties = [
  "Cardiology",
  "Doctor",
  "Dermatology",
  "Family Medicine",
  "Gastroenterology",
  "Internal Medicine",
  "Neurology",
  "Obstetrics",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Urology",
];

const { Option } = Select;

import {
  useLocationState,
  useLocationActions,
} from "@/providers/institutionLocation-provider/index";

interface SignupFormProps {
  onSignupSuccess?: () => void;
  onBeforeSubmit?: () => void;
}

export default function SignupForm({ onBeforeSubmit }: SignupFormProps) {
  const [role, setRole] = useState<"patient" | "provider">("patient");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthActions();
  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [form] = Form.useForm();
  const { userExists } = useCheckuserActions();
  const { institutions = [], isPending } = useLocationState();
  const { getAllPlaces } = useLocationActions();

  useEffect(() => {
    getAllPlaces();
  }, []);

  const debouncedEmailCheck = useRef(
    debounce(async (value: string) => {
      const result = await userExists({ emailAddress: value, userName: "" });
      return result.result.emailExists;
    }, 500)
  ).current;

  const debouncedUsernameCheck = useRef(
    debounce(async (value: string) => {
      const result = await userExists({ emailAddress: "", userName: value });
      return result.result.userNameExists;
    }, 500)
  ).current;

  const passwordChecks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[@$!%*?&]/.test(password),
  };

  const hasErrors = form
    .getFieldsError()
    .some(({ errors }) => errors.length > 0);
  const isButtonDisabled = loading || hasErrors;

  const validateEmailExists = async (_: RuleObject, value: string) => {
    if (!value) return Promise.resolve();
    const emailExists = await debouncedEmailCheck(value);
    if (emailExists) return Promise.reject("Email already exists");
    return Promise.resolve();
  };

  const validateUsernameExists = async (_: RuleObject, value: string) => {
    if (!value) return Promise.resolve();
    const usernameExists = await debouncedUsernameCheck(value);
    if (usernameExists) return Promise.reject("Username already exists");
    return Promise.resolve();
  };

  const handleRoleChange = (e: RadioChangeEvent) => {
    setRole(e.target.value.toLowerCase());
  };
  const onFinishSignup = async (values: IAuth) => {
    onBeforeSubmit?.();
    setLoading(true);

    const formattedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth
        ? dayjs(values.dateOfBirth).toDate()
        : undefined,
    };

    
    await signUp(formattedValues); // Now the role is still available
    setLoading(false);
  };

  return (
    <Spin spinning={loading} tip="Please hold on...">
      <Form
        form={form}
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
          <Radio.Group onChange={handleRoleChange} value={role}>
            <Radio value="PATIENT">Patient</Radio>
            <Radio value="PROVIDER">Medical practitioner</Radio>
          </Radio.Group>
        </Form.Item>

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
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="emailAddress"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
            { validator: validateEmailExists },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="userName"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: "Please input your username!" },
            { validator: validateUsernameExists },
          ]}
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
                    )}{" "}
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
              />
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
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
              rules={[
                { required: true, message: "Please input your province!" },
              ]}
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
              rules={[
                { required: true, message: "Please input your country!" },
              ]}
            >
              <Input placeholder="Country" />
            </Form.Item>

            <Form.Item
              name="preferredContactMethod"
              rules={[
                {
                  required: true,
                  message: "Please select your preferred contact method!",
                },
              ]}
            >
              <Select placeholder="Preferred Contact Method">
                <Option value={1}>Email</Option>
                <Option value={2}>Phone</Option>
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
                  message: "Please enter years of experience!",
                },
              ]}
            >
              <Input type="number" placeholder="Years of Experience" />
            </Form.Item>

            <Form.Item
              name="maxAppointmentsPerDay"
              rules={[
                {
                  required: true,
                  message: "Please enter max appointments per day!",
                },
              ]}
            >
              <Input type="number" placeholder="Max Appointments Per Day" />
            </Form.Item>

            <Form.Item
              name="qualification"
              rules={[
                { required: true, message: "Please enter your qualification!" },
              ]}
            >
              <Input placeholder="Qualification" />
            </Form.Item>

            <Form.Item
              name="specialty"
              rules={[
                { required: true, message: "Please select your specialty!" },
              ]}
            >
              <Select placeholder="Select Specialty" showSearch>
                {specialties.map((spec) => (
                  <Option key={spec} value={spec}>
                    {spec}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="institutionId"
              rules={[
                { required: true, message: "Please select your institution!" },
              ]}
            >
              <Select
                placeholder="Select Institution"
                showSearch
                loading={isPending}
                filterOption={(input, option) =>
                  (option?.label as string)
                    ?.toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={institutions.map((inst) => ({
                  label: inst.description, // used for searching
                  value: inst.id,
                  inst, // attach full object for rendering
                }))}
                optionRender={(option) => {
                  const inst = option.data.inst;
                  return (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <strong>{inst.description}</strong>
                      <span style={{ fontSize: 12, color: "gray" }}>
                        {inst.address} • {inst.city}, {inst.state}
                      </span>
                    </div>
                  );
                }}
                notFoundContent={
                  !isPending && institutions.length === 0 ? (
                    <div style={{ padding: "8px", color: "gray" }}>
                      No institutions found
                    </div>
                  ) : null
                }
              />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            loading={loading}
            disabled={isButtonDisabled}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}
