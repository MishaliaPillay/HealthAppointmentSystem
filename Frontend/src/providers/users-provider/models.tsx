"user client"
import { IAppointment } from "../appointment-provider/context";

//User object interface
export interface IUser {
    id?:number,
    name:string,
    surname:string, 
    emailAddress:string,
    userName:string,
  }

export interface IProvider{
     User:IUser,
     Title:string, 
     PhoneNumber:string,
     Biography:string,
     YearsOfExperience:number,
     MaxAppointmentsPerDay:number,
     Qualification:string
}
export interface IPatient {
  user: IUser;
  title: string;
  phoneNumber: string;
  dateOfBirth: string; // Use ISO 8601 format string
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  preferredContactMethod: number;
  appointments: IAppointment[]; // Array of appointments
  id: string; // UUID type
}

