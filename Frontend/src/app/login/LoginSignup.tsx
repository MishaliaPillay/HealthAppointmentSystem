"use client";
import { useEffect, useState } from "react";
import { Tabs, Typography, Spin } from "antd";
import styles from "./login-page.module.css";
import { useAuthState } from "@/providers/auth-provider";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getRole } from "@/utils/decoder";
import LoginForm from "../../components/login-form/page";
import SignupForm from "../../components/sign-up-form/page";

const { Title } = Typography;

// Define the types for activeTab and setActiveTab
interface LoginPageProps {
  activeTab: "login" | "signup"; // activeTab can only be "login" or "signup"
  setActiveTab: (tab: "login" | "signup") => void; // setActiveTab expects a string "login" or "signup"
}

export default function LoginSignup({
  activeTab,
  setActiveTab,
}: LoginPageProps) {
  const [loading, setLoading] = useState(false);
  const { isSuccess, isError, isPending } = useAuthState();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");

    if (isPending) setLoading(true);

    if (isError) {
      toast.error("Your authentication was unsuccessful!");
      setLoading(false);
    }

    if (isSuccess) {
      const role = getRole(token);

      if (authMode === "signup") {
        // Switch to login tab after successful signup
        setActiveTab("login");
      } else {
        // Login success → redirect to dashboard based on role
        if (role === "provider") {
          router.push("/provider-dashboard");
        } else if (role === "patient") {
          router.push("/patient-dashboard");
        } else {
          router.push("/");
        }
      }

      setLoading(false);
    }
  }, [isPending, isError, isSuccess, router, authMode, setActiveTab]);

  return (
    <Spin spinning={loading} tip="Please hold on...">
      <div className={styles.formCard}>
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
          onChange={(key) => {
            // Ensure the correct type is set
            setActiveTab(key as "login" | "signup");
          }}
          centered
          className={styles.tabs}
          items={[
            {
              key: "login",
              label: "Login",
              children: (
                <LoginForm onBeforeSubmit={() => setAuthMode("login")} />
              ),
            },
            {
              key: "signup",
              label: "Sign Up",
              children: (
                <SignupForm onBeforeSubmit={() => setAuthMode("signup")} />
              ),
            },
          ]}
        />
      </div>
    </Spin>
  );
}
