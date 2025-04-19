"use client";
import { IPatient, IPatientRegisteration, UpdatePatientDto } from "./models";
import { createContext } from "react";

// Context shape
export interface IPatientStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentPatient?: IPatient;
  errorMessage?: string;
  patient?: IPatient;
  patients?: IPatient[]; // Array of Patients
}

// Actions that will be performed on Patientss
export interface IPatientActionContext {
  getPatients: () => void;
  getPatient: (id: string) => void;
  registerPatient: (Patient: IPatientRegisteration) => Promise<void>;
  updatePatient: (Patient: string, patientData: UpdatePatientDto) => void;
  deletePatientbyId: (PatientId: string) => void; //letting user delete their own profile
  getCurrentPatient: (userId:number) => Promise<IPatient>; // Fixed camelCase name
}
// Initial state with default values
export const INITIAL_STATE: IPatientStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  patients: [],
};

// Create the state context and the action context
export const PatientStateContext =
  createContext<IPatientStateContext>(INITIAL_STATE);

export const PatientActionContext =
  createContext<IPatientActionContext>(undefined);
