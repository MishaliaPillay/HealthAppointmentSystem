import { AppointmentStatusReflist } from "@/enums/ReflistAppointStatus";
import { IProvider } from "../providerMedicPrac-provider/models";
import { IPatient } from "../paitient-provider/models";

export interface IAppointment {
  id?: string;
  appointmentDate: Date;
  appointmentTime: string;
  purpose: string;
  appointmentStatus: AppointmentStatusReflist;
  providerId: string;
  patientId: string;
  Provider: IProvider;
  Patient: IPatient;
}