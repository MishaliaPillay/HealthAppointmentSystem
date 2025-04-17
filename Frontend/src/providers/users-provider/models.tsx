"use client";

import { IPatient } from "../paitient-provider/models";

// User object interface
export interface IUser {
  id?: number;
  name: string;
  surname: string;
  emailAddress: string;
  userName: string;
  currentPatient?: IPatient; // Made optional if user isn't a patient
  currentProvider?: IProvider; // Made optional if user isn't a provider
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
