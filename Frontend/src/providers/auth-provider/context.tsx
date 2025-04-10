
"use client";
import { createContext } from "react";

// User object interface
export interface IUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
  role?: string;
  contactNumber?: string;
  activeState?: boolean;
  planType?: string;
  trial?: boolean;
  policiesAccepted?: boolean;
  date?: string;
}

// Context shape interface
export interface IUserStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  user?: IUser;
  users?: IUser[]; // Array of Users
}

// User action context interface
export interface IUserActionContext {
  // getUsers: () => Promise<UserListResponse>;
  getUser: () => Promise<UserResponse>;
  verifyUser: (user: IUser) => Promise<void>;
}

// Login response interface
export interface ILoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

// Interface for user response
export interface UserResponse {
  data: {
    data: IUser;
  };
}

// Interface for user list response
export interface UserListResponse {
  data: {
    data: IUser[];
  };
}

// Initial state with default values
export const INITIAL_STATE: IUserStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

// Create the state context and the action context
export const UserStateContext = createContext<IUserStateContext>(INITIAL_STATE);
export const UserActionContext = createContext<IUserActionContext | undefined>(
  undefined
);
