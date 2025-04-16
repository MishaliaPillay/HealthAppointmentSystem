"use client";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
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
  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const { signIn } = useAuthActions();
  const { getCurrentUser } = useUserActions();

  const onFinishLogin = async (values: ISignInRequest) => {
    onBeforeSubmit?.();
    await signIn(values);
    const token = sessionStorage.getItem("jwt");
    getCurrentUser(token);
    onLoginSuccess?.();
  };

  const passwordChecks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[@$!%*?&]/.test(password),
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
                  {
                    {
                      length: "At least 8 characters",
                      lowercase: "At least one lowercase letter",
                      uppercase: "At least one uppercase letter",
                      number: "At least one number",
                      specialChar: "At least one special character (!@#$%^&*)",
                    }[key]
                  }
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
}
