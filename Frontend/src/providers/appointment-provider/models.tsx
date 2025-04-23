import { AppointmentStatusReflist } from "@/enums/ReflistAppointStatus";
import { IProvider } from "../providerMedicPrac-provider/models";
import { IPatient } from "../paitient-provider/models";

export interface IAppointment {
  id?: string;
  appointmentDate: string;
  appointmentTime: string;
  purpose: string;
  appointmentStatus: AppointmentStatusReflist;
  providerId: string;
  patientId: string;
  Provider: IProvider;
  Patient: IPatient;
}

export interface IAppointmentApiResponse {
  appointmentDate: string; // ISO string, e.g. "2025-04-21T14:51:02.731"
  appointmentTime: string; // e.g. "12:51:00"
  purpose: string;
  appointmentStatus: number;
  provider: IProvider;
  patient: IPatient;
}