import React from "react";
import { Card, Typography } from "antd";
import styles from "../../app/provider-dashboard/providerdashdash.module.css";
import { Appointment } from "./models";
import { PatientAppointmentCard } from "./PatientsAppointment";

const { Text } = Typography;

interface TodaysAppointmentsProps {
  appointments: Appointment[];
  getPatientInitials: (patientId: string) => string;
  getPatientName: (patientId: string) => string;
  isNewPatient: (patientId: string) => boolean;
}

export const TodaysAppointments: React.FC<TodaysAppointmentsProps> = ({
  appointments,
  getPatientInitials,
  getPatientName,
  isNewPatient,
}) => {
  // Helper function to format appointment status
  const getStatusLabel = (
    status: number
  ): "scheduled" | "checked-in" | "in-progress" | "completed" | "cancelled" => {
    const statusMap: Record<
      number,
      "scheduled" | "checked-in" | "in-progress" | "completed" | "cancelled"
    > = {
      1: "scheduled",
      2: "checked-in",
      3: "in-progress",
      4: "completed",
      5: "cancelled",
    };
    return statusMap[status] || "scheduled";
  };

  return (
    <Card
      title="Today's Appointments"
      className={styles.upcomingCard}
      variant="outlined"
    >
      <div className={styles.appointmentList}>
        {appointments.length === 0 ? (
          <Text>No appointments scheduled for today</Text>
        ) : (
          appointments.slice(0, 3).map((appointment) => {
            const formattedDate = new Date(
              appointment.appointmentDate
            ).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <PatientAppointmentCard
                key={appointment.id}
                id={appointment.id}
                patientInitials={getPatientInitials(appointment.patientId)}
                name={getPatientName(appointment.patientId)}
                visitReason={appointment.purpose || "General Checkup"}
                date={formattedDate}
                time={appointment.appointmentTime.slice(0, 5)}
                status={getStatusLabel(appointment.appointmentStatus)}
                isNewPatient={isNewPatient(appointment.patientId)}
              />
            );
          })
        )}
      </div>
    </Card>
  );
};

export default TodaysAppointments;
