"use client";

import { Card, Typography } from "antd";
import { ScrollText } from "lucide-react";
import styles from "@/app/styles/legal-pages.module.css";

const { Title, Paragraph } = Typography;

export default function TermsOfService() {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <ScrollText />
        <Title level={2}>Terms of Service</Title>
      </div>

      <Card className={styles.card}>
        <Typography>
          <Paragraph className={styles.paragraph}>
            Please read these Terms of Service carefully before using the Health Appointment System as a patient.
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Acceptance of Terms</Title>
          <Paragraph className={styles.paragraph}>
            By using our appointment scheduling system, you agree to these terms and conditions. If you do not agree, please do not use the service.
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Patient Responsibilities</Title>
          <Paragraph className={styles.paragraph}>
            As a patient, you agree to:
            <br/>
            1. Provide accurate personal and medical information
            <br/>
            2. Update your information when it changes
            <br/>
            3. Keep your login credentials secure
            <br/>
            4. Respect appointment schedules
            <br/>
            5. Follow cancellation policies
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Medical Advice</Title>
          <Paragraph className={styles.paragraph}>
            1. This platform is for scheduling purposes only
            <br/>
            2. Medical advice should be obtained during appointments
            <br/>
            3. Emergency situations require immediate medical attention
            <br/>
            4. Always seek appropriate medical care for emergencies
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Privacy and Security</Title>
          <Paragraph className={styles.paragraph}>
            You acknowledge that:
            <br/>
            1. Your information will be handled according to our Privacy Policy
            <br/>
            2. You are responsible for maintaining your account security
            <br/>
            3. You will notify us of any unauthorized account access
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Service Modifications</Title>
          <Paragraph className={styles.paragraph}>
            We reserve the right to:
            <br/>
            1. Modify or discontinue services
            <br/>
            2. Update these terms at any time
            <br/>
            3. Suspend accounts for violations
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
}