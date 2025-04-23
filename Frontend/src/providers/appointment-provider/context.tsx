"use client";
import { createContext } from "react";
import { IAppointment, IAppointmentApiResponse, IAppointments } from "./models";

//Appointment Context shape Interface
export interface IAppointmentStateContext {
  readonly isPending: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
  readonly appointment?: IAppointment;
  readonly dAppointment?: IAppointments;
  readonly appointments?: IAppointmentApiResponse[];
}

export const INITIAL_STATE: IAppointmentStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// These actions will be implemented in the provider component
export interface IAppointmentActionContext {
  bookAppointment: (dAppointment: IAppointments) => void;
  getAppointments: () => Promise<IAppointmentApiResponse[]>; // Fetch all Appointments
  getAppointmentById: (id: string) => void; // Fetch a single Appointment  by the ID
  updateAppointment: (id: string, appointment: IAppointment) => void;
  deleteAppointment: (id: string) => void;
}

export const AppointmentStateContext =
  createContext<IAppointmentStateContext>(INITIAL_STATE);
export const AppointmentActionContext = createContext<
  IAppointmentActionContext | undefined
>(undefined);
