"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children?: React.ReactNode; // Children are optional to prevent errors
}

const withAuth = (WrappedLayout: React.ComponentType<LayoutProps>) => {
  const WithAuthWrapper: React.FC<LayoutProps> = ({ children, ...props }) => {
    const router = useRouter();

    useEffect(() => {
      const token = sessionStorage.getItem("jwt");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Splitting token to get payload
        const [, payload] = token.split(".");
        
        // Decoding Base64 string
        const decodedPayload = JSON.parse(atob(payload));

        // Extracting role from payload
        const { role } = decodedPayload;

        // Redirect based on role
        if (role === "provider") {
          router.push("/provider-dashboard");
        } else if (role === "patient") {
          router.push("/patient-dashboard");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/login"); //if decoding fails
      }
    }, [router]);
    return (
      <WrappedLayout {...props}>
        {children}
      </WrappedLayout>
    );
  };

  return WithAuthWrapper;
};

export default withAuth;