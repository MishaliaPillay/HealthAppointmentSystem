"use client";
import { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select, DatePicker, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import dayjs from "dayjs";

import { IUserCheck } from "@/providers/check-user-provider/models";
import { IAuth } from "@/providers/auth-provider/models";
import { useAuthActions } from "@/providers/auth-provider";
import { useCheckuserActions } from "@/providers/check-user-provider";

import styles from "../../app/page.module.css";

const { Option } = Select;

interface SignupFormProps {
  onSignupSuccess?: () => void;
  onBeforeSubmit?: () => void;
}

export default function SignupForm({ onBeforeSubmit }: SignupFormProps) {
  const [role, setrole] = useState<"patient" | "provider">("patient");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthActions();

  const [form] = Form.useForm();

  const { userExists } = useCheckuserActions();

  const hasErrors = form
    .getFieldsError()
    .some(({ errors }) => errors.length > 0);

  const isButtonDisabled = loading || hasErrors;

  const validateEmailExists = async (_: any, value: string) => {
    if (!value) return Promise.resolve();

    // This will ensure we debounce the userExists function
    return new Promise<void>((resolve, reject) => {
      // The debounced version of userExists
      const debouncedUserExists = debounce(async () => {
        try {
          const result = await userExists({
            emailAddress: value,
            userName: "",
          });
          if (result.result.emailExists) {
            reject("Email already exists");
          } else {
            resolve();
          }
        } catch (err) {
          reject("Error validating email");
        }
      }, 500); // Delay set to 500ms

      // Call the debounced function immediately (doesn't wait for user input)
      debouncedUserExists();
    });
  };

  const validateUsernameExists = async (_: any, value: string) => {
    if (!value) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      // The debounced version of userExists for username
      const debouncedUserExists = debounce(async () => {
        try {
          const result = await userExists({
            emailAddress: "",
            userName: value,
          });
          if (result.result.userNameExists) {
            reject("Username already exists");
          } else {
            resolve();
          }
        } catch (err) {
          reject("Error validating username");
        }
      }, 500); // Delay set to 500ms

      // Call the debounced function immediately
      debouncedUserExists();
    });
  };

  const handleroleChange = (e: any) => {
    setrole(e.target.value.toLowerCase());
  };

  const onFinishSignup = async (values: IAuth) => {
    onBeforeSubmit?.();
    setLoading(true);
    const formattedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth
        ? dayjs(values.dateOfBirth).toDate()
        : undefined,
      role: role,
    };

    await signUp(formattedValues);
    // Do NOT check isSuccess here – it will update *after* state change
    setLoading(false);
  };

  return (
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
        <Radio.Group onChange={handleroleChange} value={role}>
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
        rules={[{ required: true, message: "Please input your phone number!" }]}
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
        <Input.Password placeholder="Password" />
      </Form.Item>

      {role === "patient" && (
        <>
          <Form.Item
            name="dateOfBirth"
            rules={[
              { required: true, message: "Please input your date of birth!" },
            ]}
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
            rules={[{ required: true, message: "Select contact method!" }]}
          >
            <Select placeholder="Select contact method">
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
            name="qualification"
            rules={[
              { required: true, message: "Please input your qualification!" },
            ]}
          >
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
          loading={loading}
          disabled={isButtonDisabled}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}
