"use client";
import { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "../../app/login/login-page.module.css";

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  showSocialLogin?: boolean;
}

export default function LoginForm({
  className,
  onSuccess,
  onForgotPassword,
}: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinishLogin = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      // Replace with your actual API call to authenticate the user
      console.log("Login data:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      messageApi.success({
        content: "Login successful!",
        duration: 3,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Login error:", error);
      messageApi.error({
        content: "Invalid username or password",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.formContainer} ${className || ""}`}>
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
          <div className={styles.rememberForgot}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {onForgotPassword && (
              <a className={styles.forgotPassword} onClick={onForgotPassword}>
                Forgot password?
              </a>
            )}
          </div>
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
    </div>
  );
}
