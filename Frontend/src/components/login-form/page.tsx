"use client";

import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ISignInRequest } from "@/providers/auth-provider/models";
import { useAuthActions } from "@/providers/auth-provider";
import { useUserActions } from "@/providers/users-provider";
import styles from "../../app/page.module.css";

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onBeforeSubmit?: () => void;
}

export default function LoginForm({
  onLoginSuccess,
  onBeforeSubmit,
}: LoginFormProps) {
  const { signIn } = useAuthActions();
  const { getCurrentUser } = useUserActions();

  const onFinishLogin = async (values: ISignInRequest) => {
    onBeforeSubmit?.();
    await signIn(values);
    const token = sessionStorage.getItem("jwt");
    getCurrentUser(token);
    onLoginSuccess?.();
  };

  return (
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
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
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
}
