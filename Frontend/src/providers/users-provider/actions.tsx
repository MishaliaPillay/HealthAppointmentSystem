"use client";
import { IUser } from "./models";
import { IUserStateContext } from "./context";
import { createAction } from "redux-actions";

export enum UserActionEnums {
  getUsersPending = "GET_USERS_PENDING",
  getUsersSuccess = "GET_USERS_SUCCESS",
  getUsersError = "GET_USERS_ERROR",

  getUserPending = "GET_USER_PENDING",
  getUserSuccess = "GET_USER_SUCCESS",
  getUserError = "GET_USER_ERROR",

  getCurrentUserPending = "GET_CURRENTUSER_PENDING",
  getCurrentUserSuccess = "GET_CURRENTUSER_SUCCESS",
  getCurrentUserError = "GET_CURRENTUSER_ERROR",

  createUserPending = "CREATE_USER_PENDING",
  createUserSuccess = "CREATE_USER_SUCCESS",
  createUserError = "CREATE_USER_ERROR",

  updateUserPending = "UPDATE_USER_PENDING",
  updateUserSuccess = "UPDATE_USER_SUCCESS",
  updateUserError = "UPDATE_USER_ERROR",

  deleteUserPending = "DELETE_USER_PENDING",
  deleteUserSuccess = "DELETE_USER_SUCCESS",
  deleteUserError = "DELETE_USER_ERROR",
}

// Get Users
export const getUsersPending = createAction<IUserStateContext>(
  UserActionEnums.getUsersPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getUsersSuccess = createAction<IUserStateContext, IUser[]>(
  UserActionEnums.getUsersSuccess,
  (users) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    users,
  })
);

export const getUsersError = createAction<IUserStateContext>(
  UserActionEnums.getUsersError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

// Get Single User
export const getUserPending = createAction<IUserStateContext>(
  UserActionEnums.getUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getUserSuccess = createAction<IUserStateContext, IUser>(
  UserActionEnums.getUserSuccess,
  (user) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user,
  })
);

export const getUserError = createAction<IUserStateContext>(
  UserActionEnums.getUserError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Get Current User
export const getCurrentUserPending = createAction<IUserStateContext>(
  UserActionEnums.getCurrentUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getCurrentUserSuccess = createAction<IUserStateContext, IUser>(
  UserActionEnums.getCurrentUserSuccess,
  (currentUser) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    currentUser, 
  })
);

export const getCurrentUserError = createAction<IUserStateContext>(
  UserActionEnums.getCurrentUserError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

// Create User
export const createUserPending = createAction<IUserStateContext>(
  UserActionEnums.createUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createUserSuccess = createAction<IUserStateContext, IUser>(
  UserActionEnums.createUserSuccess,
  (user) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user,
  })
);

export const createUserError = createAction<IUserStateContext>(
  UserActionEnums.createUserError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Update User
export const updateUserPending = createAction<IUserStateContext>(
  UserActionEnums.updateUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateUserSuccess = createAction<IUserStateContext, IUser>(
  UserActionEnums.updateUserSuccess,
  (user) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user,
  })
);

export const updateUserError = createAction<IUserStateContext>(
  UserActionEnums.updateUserError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);


export const deleteUserPending = createAction<IUserStateContext>(
  UserActionEnums.deleteUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteUserSuccess = createAction<IUserStateContext, IUser>(
  UserActionEnums.deleteUserSuccess,
  (user) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user,
  })
);

export const deleteUserError = createAction<IUserStateContext>(
  UserActionEnums.deleteUserError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
