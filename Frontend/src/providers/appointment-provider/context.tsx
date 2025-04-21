"use client";
import { createContext } from "react";
import { IAppointment } from "./models"

//Appointment Context shape Interface
export interface IAppointmentStateContext {
  readonly isPending: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
  readonly appointment?: IAppointment;
  readonly appointments?: IAppointment[];
}

export const INITIAL_STATE: IAppointmentStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// These actions will be implemented in the provider component
export interface IAppointmentActionContext {
  bookAppointment: (appointment: IAppointment) => void;
  getAppointments: () => void; // Fetch all Appointments
  getAppointmentById: (id: string) => void; // Fetch a single Appointment  by the ID
  updateAppointment: (id: string, appointment: Partial<IAppointment>) => void;
  deleteAppointment: (id: string) => void;
}

export const AppointmentStateContext =
  createContext<IAppointmentStateContext>(INITIAL_STATE);
export const AppointmentActionContext = createContext<
  IAppointmentActionContext | undefined
>(undefined);
