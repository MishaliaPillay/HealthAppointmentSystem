import { IAppointment } from "../appointment-provider/models";
import { IUser } from "../users-provider/models";

export interface IProvider {
  user: IUser;
  title: string;
  biography: string;
  phoneNumber: string;
  yearsOfExperience: number;
  maxAppointmentsPerDay: number;
  qualification: string;
  appointments?: IAppointment[];
  _id?: string;
}
export interface IProviderRegisteration {
  user: IUser;
  title: string;
  password: string;
  biography: string;
  phoneNumber: string;
  yearsOfExperience: number;
  maxAppointmentsPerDay: number;
  qualification: string;
}
export interface UpdateProvider {
  id?: string;
  name?: string;
  surname?: string;
  emailAddress?: string;
  phoneNumber?: string;
  userName?: string;
  password?: string;
  title: string;
  biography: string;
  yearsOfExperience: number;
  qualification: string;
}
