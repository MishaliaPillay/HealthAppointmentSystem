import { AppointmentStatusReflist } from "@/enums/ReflistAppointStatus";

export interface IAppointment {
  id?: string;
  appointmentDate: Date;
  appointmentTime: string;
  purpose: string;
  appointmentStatus: AppointmentStatusReflist;
}