"use client";
import { createContext } from "react";
import { IPatient, IUser } from "./models";

// Context shape interface
export interface IUserStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentPatient?: IPatient;
  currentUser?: IUser; // Changed for naming consistency
  user?: IUser;
  users?: IUser[]; // Array of users
}

// User action context interface
export interface IUserActionContext {
  getCurrentUser: (token: string) => Promise<IUser>;
  getUsers: () => void; // Fetch all users
  getUser: (id: string) => void; // Fetch a single user
  createUser: (user: IUser) => void; // Create a new user
  updateUser: (user: IUser) => void; // Update an existing user
  deleteUser: (id: string) => void; // Delete a user
  //getCurrentPatient: (userId: number) => Promise<IPatient>; // Fixed camelCase name
  getCurrentPatient: (token:string) => Promise<IPatient>; // Fixed camelCase name
}

// Initial state with default values
export const INITIAL_STATE: IUserStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  users: [],
};

// Create the state context and the action context
export const UserStateContext = createContext<IUserStateContext>(INITIAL_STATE);
export const UserActionContext = createContext<IUserActionContext | undefined>(
  undefined
);
