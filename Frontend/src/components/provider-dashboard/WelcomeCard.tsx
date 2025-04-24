import React from "react";
import { Card, Typography, Avatar } from "antd";
import styles from "../../app/provider-dashboard/providerdashdash.module.css";
import { Provider } from "./models"; // Import from centralized location

const { Title, Text } = Typography;

interface WelcomeCardProps {
  provider: Provider; // Use the Provider interface
  appointmentCount: number;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  provider,
  appointmentCount,
}) => {
  const getProviderName = () => {
    if (!provider || !provider.user) return "Doctor";

    const title = provider.title || "";
    const firstName = provider.user.name || "";
    const lastName = provider.user.surname || "";

    return `${title} ${firstName} ${lastName}`.trim();
  };

  return (
    <Card className={styles.welcomeCard}>
      <div className={styles.welcomeContent}>
        <Avatar size={64} className={styles.welcomeAvatar}>
          {provider?.user?.name?.[0] || "D"}
        </Avatar>
        <div>
          <Title level={4}>Welcome, {getProviderName()}</Title>
          <Text>
            You have {appointmentCount}{" "}
            {appointmentCount === 1 ? "appointment" : "appointments"} scheduled
            for today.
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeCard;
