"use client";
import { createContext } from "react";
import { ISignInRequest, IAuth, ISignInResponse, IUserExists, IUserCheck } from "./models";

// Context shape interface
export interface IAuthStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  Auth?: IAuth;
  Auths?: IAuth[]; // Array of Auths
}

// Auth action context interface
export interface IAuthActionContext {
  signIn: (SignInRequest: ISignInRequest) => Promise<ISignInResponse>;
  signUp: (Auth: IAuth) => Promise<void>;
  signOut: () => void;
 userExists:(UserCheck: IUserCheck)=>Promise<IUserExists>
}

// Initial state with default values
export const INITIAL_STATE: IAuthStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  Auths: [],
};

// Create the state context and the action context
export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);
export const AuthActionContext = createContext<IAuthActionContext | undefined>(
  undefined
);
