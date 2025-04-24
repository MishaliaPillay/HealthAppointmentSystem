import React from "react";
import { Button, Tag } from "antd";
import styles from "../../app/provider-dashboard/providerdashdash.module.css";
import { UserCircle } from "lucide-react";

export interface PatientAppointmentCardProps {
  id: string;
  patientInitials: string;
  name: string;
  visitReason: string;
  date: string;
  time: string;
  status:
    | "scheduled"
    | "checked-in"
    | "in-progress"
    | "completed"
    | "cancelled";
  isNewPatient: boolean;
}

export const PatientAppointmentCard: React.FC<PatientAppointmentCardProps> = ({

  name,
  visitReason,
  date,
  time,
  status,
  isNewPatient,
}) => {
  return (
    <div className={styles.appointmentCard}>
      <div className={styles.appointmentInfo}>
        <div className={styles.initialsCircle}>
          <UserCircle />
        </div>
        <div>
          <div className={styles.id}>
            {name}
            {isNewPatient && (
              <Tag color="blue" className={styles.newPatientTag}>
                New
              </Tag>
            )}
          </div>
          <div className={styles.details}>
            {visitReason} • {date} • {time}
          </div>
        </div>
      </div>

      {status === "in-progress" && (
        <>
          <span className={styles.statusInProgress}>In Progress</span>
          <Button size="small">Complete</Button>
        </>
      )}
      {status === "completed" && (
        <span className={styles.statusCompleted}>Completed</span>
      )}
      {status === "cancelled" && (
        <span className={styles.statusCancelled}>Cancelled</span>
      )}
    </div>
  );
};

export default PatientAppointmentCard;
