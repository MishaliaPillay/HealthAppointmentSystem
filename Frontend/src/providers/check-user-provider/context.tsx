"use client";
import { createContext } from "react";
import { IUserExists, IUserCheck } from "./models";

// Context shape interface
export interface ICheckUserStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

// CheckUser action context interface
export interface ICheckUserActionContext {
  userExists: (UserCheck: IUserCheck) => Promise<IUserExists>;
}

// Initial state with default values
export const INITIAL_STATE: ICheckUserStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Create the state context and the action context
export const CheckUserStateContext =
  createContext<ICheckUserStateContext>(INITIAL_STATE);
export const CheckUserActionContext = createContext<
  ICheckUserActionContext | undefined
>(undefined);
