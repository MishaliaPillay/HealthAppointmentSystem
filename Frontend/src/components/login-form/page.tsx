"use client";
import { useRef, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { ISignInRequest } from "@/providers/auth-provider/models";
import { useAuthActions } from "@/providers/auth-provider";
import { useUserActions } from "@/providers/users-provider";
import { useCheckuserActions } from "@/providers/check-user-provider";
import debounce from "lodash.debounce";
import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";
import styles from "../../app/login/login-page.module.css";

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onBeforeSubmit?: () => void;
}

let validationCount = 0;

export default function LoginForm({
  onLoginSuccess,
  onBeforeSubmit,
}: LoginFormProps) {
  const { signIn } = useAuthActions();
  const { userExists } = useCheckuserActions();
  const { getCurrentUser } = useUserActions();
  const [loading, setLoading] = useState(false);

  // Debounced user existence check
  const debouncedEmailCheck = useRef(
    debounce(async (value: string): Promise<boolean> => {
      const result = await userExists({ emailAddress: value, userName: "" });
      return !!result.result?.emailExists;
    }, 300)
  ).current;

  // Email validation rule
  const validateEmailExists = async (_: RuleObject, value: StoreValue) => {
    if (!value) return Promise.resolve();

    const currentValidation = ++validationCount; // Track validation instance
    setLoading(true);

    const exists = await debouncedEmailCheck(value);
    setLoading(false);

    if (currentValidation !== validationCount) {
      return Promise.resolve(); // Ignore outdated validation
    }

    if (!exists) {
      return Promise.reject("User does not exist");
    }

    return Promise.resolve();
  };

  // Handle login submit
  const onFinishLogin = async (values: ISignInRequest) => {
    onBeforeSubmit?.();
    setLoading(true);

    const exists = await userExists({
      emailAddress: values.userNameOrEmailAddress,
      userName: "",
    });

    console.log("User exists response:", exists);
    setLoading(false);

    if (!exists.result?.emailExists) {
      message.error("User does not exist");
      return;
    }

    try {
      const loginResult = await signIn(values);
      console.log("Login result:", loginResult);

      if (loginResult) {
        const token = sessionStorage.getItem("jwt");
        getCurrentUser(token);
        message.success("Successfully logged in!");
        onLoginSuccess?.();
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        message.error(
          error.response.data.errorMessage ||
            "Login failed! Please check your credentials."
        );
      } else {
        message.error("Login failed! Please check your credentials.");
      }
    }
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
        validateTrigger={["onBlur", "onSubmit"]}
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
          { validator: validateEmailExists },
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
  );
}
