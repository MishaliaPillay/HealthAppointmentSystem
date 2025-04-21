"use client";
import { createContext } from "react";

export interface IProvidersAvailability {
  id: string;
  providerId: string;
  dateAvailable: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface IProviderAvailabilityStateContext {
  readonly isPending: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
  readonly availabilities?: IProvidersAvailability[];
}

export const INITIAL_STATE: IProviderAvailabilityStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  availabilities: [],
};

export interface IProviderAvailabilityActionContext {
  fetchAvailabilityByProvider: (providerId: string) => void;
  createAvailability: (data: IProvidersAvailability) => void;
  updateAvailability: (data: IProvidersAvailability) => void;
}

export const ProviderAvailabilityStateContext =
  createContext<IProviderAvailabilityStateContext>(INITIAL_STATE);
export const ProviderAvailabilityActionContext = createContext<
  IProviderAvailabilityActionContext | undefined
>(undefined);
