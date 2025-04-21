"use client";
import { useState } from "react";
import LoginSignup from "./LoginSignup";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return <LoginSignup activeTab={activeTab} setActiveTab={setActiveTab} />;
}
