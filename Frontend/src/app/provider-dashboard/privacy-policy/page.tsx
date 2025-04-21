"use client";

import { Card, Typography } from "antd";
import { Shield } from "lucide-react";
import styles from "@/app/styles/legal-pages.module.css";

const { Title, Paragraph } = Typography;

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <Shield />
        <Title level={2}>Privacy Policy</Title>
      </div>

      <Card className={styles.card}>
        <Typography>
          <Paragraph className={styles.paragraph}>
            <strong>Last Updated: April 21, 2025</strong>
          </Paragraph>

          <Paragraph className={styles.paragraph}>
            Welcome to the Health Appointment System. This Privacy Policy describes how we handle and protect information in our healthcare provider platform.
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Information We Collect</Title>
          <Paragraph className={styles.paragraph}>
            1. Professional credentials and qualifications
            <br/>
            2. Practice information and schedules
            <br/>
            3. Patient interaction records
            <br/>
            4. Communication logs
            <br/>
            5. System usage data
          </Paragraph>

          <Title level={4} className={styles.subtitle}>How We Use Information</Title>
          <Paragraph className={styles.paragraph}>
            We use the collected information to:
            <br/>
            1. Facilitate appointment management
            <br/>
            2. Maintain accurate provider profiles
            <br/>
            3. Enable secure patient communications
            <br/>
            4. Improve platform services
            <br/>
            5. Ensure regulatory compliance
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Provider Rights</Title>
          <Paragraph className={styles.paragraph}>
            As a healthcare provider, you have the right to:
            <br/>
            1. Access and update your professional information
            <br/>
            2. Control your availability settings
            <br/>
            3. Request data exports
            <br/>
            4. Manage communication preferences
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Compliance</Title>
          <Paragraph className={styles.paragraph}>
            Our platform adheres to:
            <br/>
            1. HIPAA regulations
            <br/>
            2. Medical data protection standards
            <br/>
            3. Local healthcare privacy laws
            <br/>
            4. Professional ethics guidelines
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Policy Updates</Title>
          <Paragraph className={styles.paragraph}>
            We will notify you of any significant changes to this policy. Continued use of the platform constitutes acceptance of updates.
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Contact</Title>
          <Paragraph className={styles.paragraph}>
            For privacy-related inquiries, please contact our compliance team through the dashboard.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
}