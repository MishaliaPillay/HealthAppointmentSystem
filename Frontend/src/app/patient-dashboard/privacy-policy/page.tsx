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
            Welcome to the Health Appointment System. Your privacy is our top priority. This Privacy Policy explains how we collect, use, and protect your personal health information.
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Information We Collect</Title>
          <Paragraph className={styles.paragraph}>
            - Personal identification information (name, email, phone number)
            <br/>
            1. Health and medical information
            <br/>
            2. Appointment history and preferences
            <br/>
            3. Insurance information (if applicable)
            <br/>
            4. Communication records with healthcare providers
          </Paragraph>

          <Title level={4} className={styles.subtitle}>How We Use Your Information</Title>
          <Paragraph className={styles.paragraph}>
            We use your information to:
            <br/>
            1. Schedule and manage your appointments
            <br/>
            2. Provide personalized healthcare services
            <br/>
            3. Communicate with your healthcare providers
            <br/>
            4. Send appointment reminders and updates
            <br/>
            5. Improve our services
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Data Protection</Title>
          <Paragraph className={styles.paragraph}>
            We implement robust security measures to protect your personal and medical information:
            <br/>
            1. All data is encrypted in transit and at rest
            <br/>
            2. Access controls and authentication measures
            <br/>
            3. Regular security audits and updates
            <br/>
            4. Compliance with healthcare privacy regulations
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Your Rights</Title>
          <Paragraph className={styles.paragraph}>
            You have the right to:
            <br/>
            1. Access your personal information
            <br/>
            2. Request corrections to your data
            <br/>
            3. Request deletion of your information
            <br/>
            4. Receive a copy of your data
            <br/>
            5. Opt-out of certain data uses
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Updates to Privacy Policy</Title>
          <Paragraph className={styles.paragraph}>
            We may update this privacy policy periodically. We will notify you of any significant changes.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
}
