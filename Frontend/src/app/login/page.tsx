"use client";
import { useState } from "react";
import { Tabs, Typography } from "antd";
import SignupForm from "../../components/signup/Signup";
import LoginForm from "../../components/login/Login";
import styles from "./login-page.module.css";

const { Title } = Typography;

interface LoginSignupProps {
  className?: string;
  onLoginSuccess?: () => void;
  onSignupSuccess?: () => void;
  showSocialLogin?: boolean;
}

export default function LoginSignup({
  className,
  onLoginSuccess,
  onSignupSuccess,
  showSocialLogin = true,
}: LoginSignupProps) {
  const [activeTab, setActiveTab] = useState<string>("login");

  const handleLoginSuccess = () => {
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const handleSignupSuccess = () => {
    // You might want to automatically switch to login tab after successful signup
    setActiveTab("login");
    if (onSignupSuccess) {
      onSignupSuccess();
    }
  };

  const handleForgotPassword = () => {
    // Implement your forgot password flow here
    console.log("Forgot password clicked");
  };

  const tabItems = [
    {
      key: "login",
      label: "Login",
      children: (
        <LoginForm
          onSuccess={handleLoginSuccess}
          onForgotPassword={handleForgotPassword}
          showSocialLogin={showSocialLogin}
        />
      ),
    },
    {
      key: "signup",
      label: "Sign Up",
      children: (
        <SignupForm
          onSuccess={handleSignupSuccess}
          showSocialLogin={showSocialLogin}
        />
      ),
    },
  ];

  return (
    <div className={`${styles.formCard} ${className || ""}`}>
      <Title level={2} className={styles.title}>
        {activeTab === "login" ? "Welcome Back!" : "Create Account"}
      </Title>
      <Title level={4} className={styles.subtitle}>
        {activeTab === "login"
          ? "Log in to connect with healthcare professionals"
          : "Join our platform to connect patients with healthcare professionals"}
      </Title>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        className={styles.tabs}
        items={tabItems}
      />
    </div>
  );
}
