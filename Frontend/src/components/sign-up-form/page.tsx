"use client";
import { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select, DatePicker, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import { IAuth } from "@/providers/auth-provider/models";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";

import styles from "../../app/page.module.css";

const { Option } = Select;

interface SignupFormProps {
  onSignupSuccess?: () => void;
}

export default function SignupForm({ onSignupSuccess }: SignupFormProps) {
  const [role, setrole] = useState<"patient" | "provider">("patient");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuthActions();
  const { isSuccess } = useAuthState();
  const router = useRouter();

  const handleroleChange = (e: any) => {
    setrole(e.target.value.toLowerCase());
  };

  const onFinishSignup = async (values: IAuth) => {
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

  // ✅ This will handle routing after signup success
  useEffect(() => {
    if (isSuccess === true) {
      console.log("Signup was successful!");
      router.push("/");
      onSignupSuccess?.();
    }
  }, [isSuccess, router, onSignupSuccess]);


  return (
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
          className={styles.submitButton}loading={loading}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}
