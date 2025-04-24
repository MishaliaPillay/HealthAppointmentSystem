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
  message,
  Modal,
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
import { RuleObject } from "antd/lib/form";

import styles from "../../app/login/login-page.module.css";
import {
  useLocationState,
  useLocationActions,
} from "@/providers/institutionLocation-provider";

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

interface SignupFormProps {
  onSignupSuccess?: () => void;
  onBeforeSubmit?: () => void;
}

export default function SignupForm({ onBeforeSubmit }: SignupFormProps) {
  const [role, setRole] = useState<"patient" | "provider">("patient");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [adminPasswordModalVisible, setAdminPasswordModalVisible] =
    useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");

  const { signUp } = useAuthActions();
  const { userExists } = useCheckuserActions();
  const { institutions = [], isPending } = useLocationState();
  const { getAllPlaces } = useLocationActions();
  const [form] = Form.useForm();
  const ADMIN_PASSWORD = "123qwe"; // Hardcoded for now

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
    const selectedRole = e.target.value.toLowerCase();

    if (selectedRole === "provider") {
      setAdminPasswordModalVisible(true);
    } else {
      setRole("patient");
      form.setFieldsValue({ role: "PATIENT" });
    }
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

    await signUp(formattedValues);
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
        <div className={styles.signupGrid}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Account Type</h3>
          </div>

          <Form.Item
            name="role"
            label="I am a:"
            className={styles.fullWidth}
            rules={[
              { required: true, message: "Please select your account type!" },
            ]}
          >
            <Radio.Group onChange={handleRoleChange} value={role}>
              <Radio value="PATIENT">Patient</Radio>
              <Radio value="PROVIDER">Medical practitioner</Radio>
            </Radio.Group>
          </Form.Item>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
          </div>

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

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Account Information</h3>
          </div>

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
            className={styles.fullWidth}
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
                onFocus={() => password && setShowTooltip(true)}
              />
              {showTooltip && (
                <div className={styles.passwordStrengthTooltip}>
                  <p>Password must contain:</p>
                  {Object.entries(passwordChecks).map(([key, valid]) => (
                    <div key={key} className={styles.passwordCheck}>
                      {valid ? (
                        <CheckCircleOutlined className={styles.valid} />
                      ) : (
                        <CloseCircleOutlined className={styles.invalid} />
                      )}
                      <span className={valid ? styles.valid : styles.invalid}>
                        {key === "length" && "At least 8 characters"}
                        {key === "lowercase" && "At least one lowercase letter"}
                        {key === "uppercase" && "At least one uppercase letter"}
                        {key === "number" && "At least one number"}
                        {key === "specialChar" &&
                          "At least one special character (!@#$%^&*)"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Form.Item>

          {/* Patient Fields */}
          {role === "patient" && (
            <>
              <Form.Item
                name="dateOfBirth"
                rules={[{ required: true, message: "Please input DOB!" }]}
              >
                <DatePicker
                  placeholder="Date of Birth"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="preferredContactMethod"
                rules={[
                  { required: true, message: "Please select contact method!" },
                ]}
              >
                <Select placeholder="Preferred Contact Method">
                  <Option value={1}>Email</Option>
                  <Option value={2}>Phone</Option>
                </Select>
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
            </>
          )}

          {/* Provider Fields */}
          {role === "provider" && (
            <>
              <Form.Item name="specialtyName" rules={[{ required: true }]}>
                <Select placeholder="Select Specialty" showSearch>
                  {specialties.map((spec) => (
                    <Option key={spec} value={spec}>
                      {spec}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="qualification" rules={[{ required: true }]}>
                <Input placeholder="Qualification" />
              </Form.Item>

              <Form.Item name="yearsOfExperience" rules={[{ required: true }]}>
                <Input type="number" placeholder="Years of Experience" />
              </Form.Item>

              <Form.Item
                name="maxAppointmentsPerDay"
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Max Appointments Per Day" />
              </Form.Item>

              <Form.Item name="biography" rules={[{ required: true }]}>
                <Input.TextArea placeholder="Professional Biography" rows={4} />
              </Form.Item>

              <Form.Item name="institutionId" rules={[{ required: true }]}>
                <Select
                  placeholder="Select Institution"
                  showSearch
                  loading={isPending}
                  optionLabelProp="label"
                  filterOption={(input, option) =>
                    (option?.label as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={institutions.map((inst) => ({
                    label: (
                      <div className={styles.institutionOption}>
                        <span className={styles.institutionName}>
                          {inst.description}
                        </span>
                        <span className={styles.institutionAddress}>
                          {inst.address}
                        </span>
                      </div>
                    ),
                    value: inst.id,
                  }))}
                />
              </Form.Item>
            </>
          )}

          <Form.Item className={styles.fullWidth}>
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
        </div>
      </Form>

      <Modal
        title="Admin Password Required"
        open={adminPasswordModalVisible}
        onOk={() => {
          if (adminPasswordInput === ADMIN_PASSWORD) {
            setRole("provider");
            form.setFieldsValue({ role: "PROVIDER" });
          } else {
            message.error(
              "Incorrect admin password. Defaulting to patient account."
            );
            setRole("patient");
            form.setFieldsValue({ role: "PATIENT" });
          }
          setAdminPasswordModalVisible(false);
          setAdminPasswordInput("");
        }}
        onCancel={() => {
          setRole("patient");
          form.setFieldsValue({ role: "PATIENT" });
          setAdminPasswordModalVisible(false);
          setAdminPasswordInput("");
        }}
        okText="Continue"
        cancelText="Cancel"
      >
        <Input.Password
          placeholder="Enter admin password"
          value={adminPasswordInput}
          onChange={(e) => setAdminPasswordInput(e.target.value)}
        />
      </Modal>
    </Spin>
  );
}
