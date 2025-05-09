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
  provider: IProvider;
  patient: IPatient;
}

export interface IAppointments {
  id?: string;
  appointmentDate: Date;
  appointmentTime: string;
  purpose: string;
  appointmentStatus: AppointmentStatusReflist;
  providerId: string;
  patientId: string;
  provider?: IProvider;
  patient?: IPatient;
}
export interface IAppointmentApiResponse {
  appointmentDate: string;
  appointmentTime: string;
  purpose: string;
  id?: string;
  appointmentStatus: number;
  appointments: IAppointment;
  provider: IProvider;
  patient: IPatient;
}
