// import React, { useState } from "react";
// import { Typography, Avatar, Button, Input } from "antd";
// import {
//   EnvironmentOutlined,
//   CalendarOutlined,
//   ClockCircleOutlined,
//   LeftOutlined,
// } from "@ant-design/icons";
// import { Doctor, Specialty, Facility, TimeSlot } from "../types";
// import { useStyles } from "../styles";

// const { Title, Text } = Typography;
// const { TextArea } = Input;

// interface TimeStepProps {
//   doctor: Doctor | null;
//   facility: Facility | null;
//   date: string | null;
//   timeSlots: TimeSlot[];
//   specialties: Specialty[];
//   selectedTimeSlot: TimeSlot | null;
//   onSelect: (timeSlot: TimeSlot) => void;
//   onBack: () => void;
//   // These props are now optional since we'll handle state internally
//   appointmentReason?: string;
//   onReasonChange?: (reason: string) => void;
// }

// export const TimeStep: React.FC<TimeStepProps> = ({
//   doctor,
//   facility,
//   date,
//   timeSlots,
//   specialties,
//   selectedTimeSlot,
//   onSelect,
//   onBack,
//   // We'll still accept these from parent if provided
//   appointmentReason: externalAppointmentReason,
//   onReasonChange,
// }) => {
//   const { styles } = useStyles();

//   // Internal state for the appointment reason
//   const [internalAppointmentReason, setInternalAppointmentReason] =
//     useState("");

//   // Use either the external value (if provided) or the internal state
//   const appointmentReason =
//     externalAppointmentReason !== undefined
//       ? externalAppointmentReason
//       : internalAppointmentReason;

//   const formatDate = (dateString: string | null) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const value = e.target.value;

//     // Update internal state
//     setInternalAppointmentReason(value);

//     // Also call external handler if provided
//     if (onReasonChange) {
//       onReasonChange(value);
//     }
//   };

//   return (
//     <div>
//       <div className={styles.backButton} onClick={onBack}>
//         <LeftOutlined /> Back to Dates
//       </div>
//       <div className={styles.summaryCard}>
//         <Title level={5}>Appointment Summary</Title>
//         <div
//           style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
//         >
//           <Avatar size={64} src={doctor?.image} />
//           <div style={{ marginLeft: 16 }}>
//             <Text strong>{doctor?.name}</Text>
//             <div>
//               <Text type="secondary">
//                 {specialties.find((s) => s.id === doctor?.specialty)?.name}
//               </Text>
//             </div>
//           </div>
//         </div>
//         <div style={{ marginBottom: 8 }}>
//           <EnvironmentOutlined style={{ marginRight: 8 }} />
//           <Text>{facility?.name}</Text>
//         </div>
//         <div style={{ marginBottom: 16 }}>
//           <CalendarOutlined style={{ marginRight: 8 }} />
//           <Text>{formatDate(date)}</Text>
//         </div>

//         <div>
//           <Text strong>Reason for appointment</Text>
//           <div style={{ marginTop: 8 }}>
//             <TextArea
//               placeholder="Please describe the reason for your appointment (500 characters max)"
//               maxLength={500}
//               rows={4}
//               value={appointmentReason}
//               onChange={handleReasonChange}
//               showCount
//             />
//           </div>
//         </div>
//       </div>
//       <Title level={4}>Select a Time</Title>
//       {timeSlots.length > 0 ? (
//         <div className={styles.timeSlotGrid}>
//           {timeSlots.map((slot) => (
//             <Button
//               key={slot.id}
//               type={selectedTimeSlot?.id === slot.id ? "primary" : "default"}
//               onClick={() => onSelect(slot)}
//               className={styles.timeSlot}
//             >
//               <ClockCircleOutlined
//                 style={{ display: "block", margin: "0 auto 8px" }}
//               />
//               <Text>{slot.time}</Text>
//             </Button>
//           ))}
//         </div>
//       ) : (
//         <Text>No available time slots for the selected date.</Text>
//       )}
//     </div>
//   );
// };
