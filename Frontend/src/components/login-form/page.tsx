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
  // const { userExists } = useCheckuserActions();
  const { getCurrentUser } = useUserActions();
  const [loading, setLoading] = useState(false); // Loading state

  // Debounced check
  // const debouncedEmailCheck = useRef(
  //   debounce(async (value: string) => {
  //     const result = await userExists({ emailAddress: value, userName: "" });
  //     return result.result?.emailExists;
  //   }, 300)
  // ).current;

  // Validation rule
  // const validateEmailExists = async (_: RuleObject, value: StoreValue) => {
  //   if (!value) return Promise.resolve();
  //   setLoading(true); // Start loading indicator
  //   const exists = await debouncedEmailCheck(value);
  //   setLoading(false); // Stop loading indicator

  //   if (!exists) {
  //     return Promise.reject("User does not exist");
  //   }
  //   return Promise.resolve();
  // };

  const onFinishLogin = async (values: ISignInRequest) => {
    onBeforeSubmit?.();
    setLoading(true); // Start loading when checking user existence

    // const exists = await userExists({
    //   emailAddress: values.userNameOrEmailAddress, // ✅ FIXED
    //   userName: "",
    // });

    // console.log("User exists response:", exists);

    setLoading(false); // Stop loading after check is done

    // if (!exists.result?.emailExists) {
    //   message.error("User does not exist");
    //   return;
    // }

    try {
      // Attempt to sign in
      const loginResult = await signIn(values);
      console.log("Login result:", loginResult);

      // If the backend indicates login success, continue
      if (loginResult) {
        const token = sessionStorage.getItem("jwt");
        getCurrentUser(token);
        onLoginSuccess?.();
      }
    } catch (error) {
      // Handle login failure (e.g., incorrect password or backend issues)
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        // Backend might return specific error details
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
          //{ validator: validateEmailExists },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          disabled={loading} // Disable input while checking
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
          loading={loading} // Show loading spinner while submitting
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
}
