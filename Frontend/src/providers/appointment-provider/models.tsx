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
  appointmentDate: string; 
  appointmentTime: string; 
  purpose: string;
  id?: string;
  appointmentStatus: number;
  appointments: IAppointment;
  provider: IProvider;
  patient: IPatient;

}