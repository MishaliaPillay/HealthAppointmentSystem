import React from "react";
import { Card, Button } from "antd";
import styles from "../../app/provider-dashboard/providerdashdash.module.css";

export const QuickActions: React.FC = () => {
  return (
    <Card title="Quick Actions" variant="outlined">
      <div className={styles.quickActions}>
        <Button type="primary" size="large" block>
          View Today&apos;s Schedule
        </Button>
        <Button size="large" block>
          Manage Availability
        </Button>
      </div>
    </Card>
  );
};

export default QuickActions;
