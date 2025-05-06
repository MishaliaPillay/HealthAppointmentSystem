import React from "react";
import { Card, Button } from "antd";
import styles from "../../app/provider-dashboard/providerdashdash.module.css";
import { useRouter } from "next/navigation";
 type QuickActionsProps = {
   onManageAvailabilityClick?: () => void;
 };
export const QuickActions: React.FC<QuickActionsProps> = ({
  onManageAvailabilityClick,
}) => {
  const router = useRouter();

  const onclickSchedule = () => {
    router.push("/provider-dashboard/appointments");
  };
  const onClickAvail = () => {
    if (onManageAvailabilityClick) {
      onManageAvailabilityClick();
    }
  };
  return (
    <Card title="Quick Actions" variant="outlined">
      <div className={styles.quickActions}>
        <Button type="primary" size="large" block onClick={onclickSchedule}>
          View Today&apos;s Schedule
        </Button>
        <Button size="large" block onClick={onClickAvail}>
          Manage Availability
        </Button>
      </div>
    </Card>
  );
};

export default QuickActions;
