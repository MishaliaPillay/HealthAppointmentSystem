"use client";
import { createContext } from "react";

export interface IProvidersInInstitution {
  id: string;
  userName: string;
  fullName: string;
  title: number;
  biography: string;
  phoneNumber: string;
  maxAppointmentsPerDay: number;
  qualification: string;
  speciality: string;
}

export interface IProvidersInStateContext {
  readonly isPending: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
  readonly Provider?: IProvidersInInstitution;
  readonly Providers?: IProvidersInInstitution[];
}

export const INITIAL_STATE: IProvidersInStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export interface IProvidersInActionContext {
  getProviderInInstitution: (id: number) => void;
  getProviderBySpeality: (speciality: string) => void;
}

export const ProvidersInStateContext =
  createContext<IProvidersInStateContext>(INITIAL_STATE);
export const ProvidersInActionContext = createContext<
  IProvidersInActionContext | undefined
>(undefined);
