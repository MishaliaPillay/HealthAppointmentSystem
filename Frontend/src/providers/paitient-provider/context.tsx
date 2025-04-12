import { IPatient, IPatientRegistration } from "./models";
import { createContext } from "react";

// Context shape
export interface IPatientStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
  Patient?: IPatient;
  Patients?: IPatient[]; // Array of Patients
}

// Actions that will be performed on Patientss
export interface IPatientActionContext {
  getPatients: () => void;
  getPatient: (id: string) => void;
  registerPatient: (Patient: IPatientRegistration) => Promise<void>;
  updatePatient: (Patient: IPatient) => void;
  deletePatientbyId: (PatientId: string) => void; //letting user delete their own profile
}
// Initial state with default values
export const INITIAL_STATE: IPatientStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Create the state context and the action context
export const PatientStateContext =
  createContext<IPatientStateContext>(INITIAL_STATE);

export const PatientActionContext =
  createContext<IPatientActionContext>(undefined);
