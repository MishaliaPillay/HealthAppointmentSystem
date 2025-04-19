import { IAppointment } from "../appointment-provider/context";
import { IUser } from "../users-provider/models";

export interface IProvider {
  user: IUser;
  FirstName: string;
  LastName: string;
  Email: string;
  Title: string;
  Biography: string;
  PhoneNumber: string;
  YearsOfExperience: number;
  MaxAppointmentsPerDay: number;
  Qualification: string;
  appointments?: IAppointment[];
  _id?: string;
}
export interface IProviderRegisteration {
  FirstName: string;
  LastName: string;
  Email: string;
  Role: string;
  Title: string;
  Password: string;
  Biography: string;
  PhoneNumber: string;
  YearsOfExperience: number;
  MaxAppointmentsPerDay: number;
  Qualification: string;
}
export interface UpdateProvider {
  id?: string;
  name?: string;
  surname?: string;
  emailAddress?: string;
  phoneNumber?: string;
  userName?: string;
  email: string;
  title: string;
  biography: string;
  yearsOfExperience: number;
  maxAppointmentsPerDay: number;
  qualification: string;
  appointments?: IAppointment[];
  _id?: string;
}
