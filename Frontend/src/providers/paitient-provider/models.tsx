"use client"
import { IUser } from "../users-provider/models";
import { IAppointment } from "../appointment-provider/context";
export interface IPatientRegisteration {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
   //TODO:KM May have to remove at some point
  Password:string;
  Role: string;
  DateOfBirth: Date;
  Address: string;
  City: string;
  Province: string;
  PostalCode: string;
  Country: string;
}

export interface IPatient {
  user: IUser;
  title: string;
  phoneNumber: string;
  dateOfBirth: string; // ISO 8601 formatted string
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  preferredContactMethod?: number;
  appointments?: IAppointment[]; // Array of appointments
  id?: string | number; // UUID or numeric user ID
}

