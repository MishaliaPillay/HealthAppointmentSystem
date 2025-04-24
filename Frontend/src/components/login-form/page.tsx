"use client";
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { ISignInRequest } from "@/providers/auth-provider/models";
import { useAuthActions } from "@/providers/auth-provider";
import { useUserActions } from "@/providers/users-provider";
import { useCheckuserActions } from "@/providers/check-user-provider";

import styles from "../../app/login/login-page.module.css";

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onBeforeSubmit?: () => void;
}

export default function LoginForm({
  onLoginSuccess,
  onBeforeSubmit,
}: LoginFormProps) {
  const { signIn } = useAuthActions();
  const { userExists } = useCheckuserActions();
  const { getCurrentUser } = useUserActions();
  const [loading, setLoading] = useState(false);

  // Configure toast message options
  const [messageApi, contextHolder] = message.useMessage();

  // Toast message display functions
  const showSuccessToast = (msg = "Successfully logged in!") => {
    messageApi.success({
      content: msg,
      duration: 3,
      style: {
        marginTop: "20px",
      },
    });
  };

  const showErrorToast = (
    msg = "Login failed! Please check your credentials."
  ) => {
    messageApi.error({
      content: msg,
      duration: 5,
      style: {
        marginTop: "20px",
      },
    });
  };

  // Handle login submit
  const onFinishLogin = async (values: ISignInRequest) => {
    onBeforeSubmit?.();
    setLoading(true);

    const exists = await userExists({
      emailAddress: values.userNameOrEmailAddress,
      userName: "",
    });

    if (!exists.result?.emailExists) {
      setLoading(false);
      showErrorToast("User does not exist");
      return;
    }

    try {
      const loginResult = await signIn(values);

      if (loginResult) {
        const token = sessionStorage.getItem("jwt");
        getCurrentUser(token);
        setLoading(false);
        showSuccessToast();
        onLoginSuccess?.();
      } else {
        setLoading(false);
        showErrorToast();
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        showErrorToast(
          error.response.data.errorMessage ||
            "Login failed! Please check your credentials."
        );
      } else {
        showErrorToast();
      }
    }
  };

  return (
    <>
      {contextHolder}
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
          validateTrigger={["onBlur", "onSubmit"]}
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            loading={loading}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
