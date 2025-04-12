import { IPaitient, IPaitientRegistration } from "./models";
import { createContext } from 'react';

// Context shape
export interface IPaitientStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage?: string;
    paitient?: IPaitient;
    paitients?: IPaitient[]; // Array of Paitients
  }
  
  // Actions that will be performed on Clients
export interface IPaitientActionContext {
    getPaitients: () => void;
    getPaitient: () => void;
    createPaitient: (client: IPaitient) => void;
    registerPaitient: (client: IPaitientRegistration) => Promise<void>;
  }
// Initial state with default values
export const INITIAL_STATE: IPaitientStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
  };
  
  // Create the state context and the action context
export const PaitientStateContext =
createContext<IPaitientStateContext>(INITIAL_STATE);

export const PaitientActionContext=
createContext<IPaitientActionContext>(undefined);
