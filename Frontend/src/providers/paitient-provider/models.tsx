"use client";
import { IUser } from "../users-provider/models";
import { IAppointment } from "../appointment-provider/context";
import { ReflistConMethod } from "../../enums/ReflistConMethod"; // Import enum if needed
export interface IPatientRegisteration {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
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
  dateOfBirth: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  preferredContactMethod?: number;
  appointments?: IAppointment[];
  id?: string;
}
export interface UpdatePatientDto {
  id?: string;
  name?: string;
  surname?: string;
  emailAddress?: string;
  phoneNumber?: string;
  userName?: string;
  password?: string;
  title?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  preferredContactMethod?: ReflistConMethod;
}
