export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled" | "upcoming";
}
