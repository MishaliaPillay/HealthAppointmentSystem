"use client";
import { IProvider, IProviderRegisteration } from "./models";
import { createContext } from "react";
import { UpdateProvider } from "./models";
// Context shape
export interface IProviderStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentProvider?: IProvider;
  errorMessage?: string;
  Provider?: IProvider;
  Providers?: IProvider[]; // Array of Providers
}

// Actions that will be performed on Providerss
export interface IProviderActionContext {
  getProviders: () => Promise<IProvider[]>; // Fetch all Providers
  getProvider: (id: string) => Promise<IProvider | null>; // Fetch a single Provider
  registerProvider: (Provider: IProviderRegisteration) => Promise<void>;
  updateProvider: (
    ProviderId: string,
    providerData: UpdateProvider
  ) => Promise<void>;
  deleteProviderById: (ProviderId: string) => Promise<void>; // Let users delete their profile
  getCurrentProvider: (userId: number) => Promise<IProvider>; // Fetch Current Provider
}
// Initial state with default values
export const INITIAL_STATE: IProviderStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  Providers: [],
};

// Create the state context and the action context
export const ProviderStateContext =
  createContext<IProviderStateContext>(INITIAL_STATE);

export const ProviderActionContext =
  createContext<IProviderActionContext>(undefined);
