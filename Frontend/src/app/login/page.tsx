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

export default function LoginSignup() {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const { isSuccess, isError, isPending } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (isPending) setLoading(true);
    if (isError) {
      toast.error("Your signup was unsuccessful!");
    }
    if (isSuccess) {
      const role = getRole(token);
      if (role === "provider") router.push("/provider-dashboard");
      else if (role === "patient") router.push("/patient-dashboard");
      else router.push("/");
    }
  }, [isPending, isError, isSuccess, router]);

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
          onChange={setActiveTab}
          centered
          className={styles.tabs}
          items={[
            {
              key: "login",
              label: "Login",
              children: <LoginForm />,
            },
            {
              key: "signup",
              label: "Sign Up",
              children: (
                <SignupForm onSignupSuccess={() => setActiveTab("login")} />
              ),
            },
          ]}
        />
      </div>
    </Spin>
  );
}
