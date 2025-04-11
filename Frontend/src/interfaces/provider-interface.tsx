export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled" | "upcoming";
  patientName: string;
  type: string;
  patientId: string;
  duration: number;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
}
