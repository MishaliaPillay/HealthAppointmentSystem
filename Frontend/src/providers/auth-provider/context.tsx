"use client";
import { createContext } from "react";

//User object interface
export interface IUser {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  UserId: string;
  Role: string;
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
  getUsers: () => void; // Fetch all Users
  getUser: (id: string) => void; // Fetch a single User
  createUser: (user: IUser) => void; // Create a new User
  updateUser: (user: IUser) => void; // Update existing User
  deleteUser: (id: string) => void; // Delete a user
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
