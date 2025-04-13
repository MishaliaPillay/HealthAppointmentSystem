"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode; // Prop type for layout pages
}

const withAuth = (WrappedLayout: React.ComponentType<LayoutProps>) => {
  const WithAuthWrapper = (props: LayoutProps) => {
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
        if (role === "PROIVDER") {
          router.push("/provider-dashboard");
        } else if (role === "PATIENT") {
          router.push("/patient-dashboard");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/login"); // Redirect to login if decoding fails
      }
    }, [router]);

    // Return the wrapped component if there is no need for redirection
    return <WrappedLayout {...props} />;
  };

  return WithAuthWrapper;
};

export default withAuth;