"use client";
import { IAppointment } from "../appointment-provider/context";

// User object interface
export interface IUser {
  id?: number;
  name: string;
  surname: string;
  emailAddress: string;
  userName: string;
  currentPatient: IPatient
  currentProvider:IProvider
}

// Provider object interface
export interface IProvider {
  user: IUser;
  title: string;
  phoneNumber: string;
  biography: string;
  yearsOfExperience: number;
  maxAppointmentsPerDay: number;
  qualification: string;
}

// Patient object interface
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
  preferredContactMethod?: number;
  appointments?: IAppointment[]; // Array of appointments
  id?: string; // UUID type
}
