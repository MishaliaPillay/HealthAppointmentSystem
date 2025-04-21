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
            Please read these Terms of Service carefully before using the Health Appointment System as a healthcare provider.
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Acceptance of Terms</Title>
          <Paragraph className={styles.paragraph}>
            By accessing and using this system, you agree to be bound by these terms and all applicable laws and regulations.
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Provider Responsibilities</Title>
          <Paragraph className={styles.paragraph}>
            As a healthcare provider, you agree to:
            <br/>
            1. Maintain accurate and up-to-date professional credentials
            <br/>
            2. Comply with all applicable healthcare laws and regulations
            <br/>
            3. Protect patient confidentiality and privacy
            <br/>
            4. Maintain accurate appointment schedules
          </Paragraph>

          <Title level={4} className={styles.subtitle}>System Usage</Title>
          <Paragraph className={styles.paragraph}>
            1. You are responsible for maintaining the security of your account
            <br/>
            2. You must not share your login credentials
            <br/>
            3. You agree to use the system only for legitimate medical purposes
            <br/>
            4. You must not attempt to circumvent any security measures
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Appointment Management</Title>
          <Paragraph className={styles.paragraph}>
            1. You agree to maintain accurate availability schedules
            <br/>
            2. You must provide reasonable notice for any schedule changes
            <br/>
            3. You are responsible for managing your appointments professionally
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Data Privacy</Title>
          <Paragraph className={styles.paragraph}>
            You agree to:
            <br/>
            1. Handle patient data in accordance with privacy laws
            <br/>
            2. Only access patient information when necessary
            <br/>
            3. Report any data breaches immediately
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Liability</Title>
          <Paragraph className={styles.paragraph}>
            1. You maintain professional liability insurance
            <br/>
            2. You understand this platform is for scheduling only
            <br/>
            3. You are responsible for all medical decisions
            <br/>
            4. The platform does not provide medical advice
          </Paragraph>

          <Title level={4} className={styles.subtitle}>Changes to Terms</Title>
          <Paragraph className={styles.paragraph}>
            We may update these terms periodically. Continued use of the system constitutes acceptance of any changes.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
}
