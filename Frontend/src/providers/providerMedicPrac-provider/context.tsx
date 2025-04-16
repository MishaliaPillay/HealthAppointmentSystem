"use client"
import { IProvider, IProviderRegisteration } from "./models";
import { createContext } from "react";

// Context shape
export interface IProviderStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
  Provider?: IProvider;
  Providers?: IProvider[]; // Array of Providers
}

// Actions that will be performed on Providerss
export interface IProviderActionContext {
  getProviders: () => void;
  getProvider: (id: string) => void;
  registerProvider: (Provider: IProviderRegisteration) => Promise<void>;
  updateProvider: (Provider: IProvider) => void;
  deleteProviderbyId: (ProviderId: string) => void; //letting user delete their own profile
}
// Initial state with default values
export const INITIAL_STATE: IProviderStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Create the state context and the action context
export const ProviderStateContext =
  createContext<IProviderStateContext>(INITIAL_STATE);

export const ProviderActionContext =
  createContext<IProviderActionContext>(undefined);
