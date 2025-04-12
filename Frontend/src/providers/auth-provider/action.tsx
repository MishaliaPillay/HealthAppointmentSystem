"use client";
import {IUser} from "./models"
import {IUserStateContext } from "./context";
import { createAction } from "redux-actions";
//make enums defining the actions that can be dispatched

export enum UserActionEnums {
  // define 3 states for each action (pending , success, error)

  signInPending = "SIGN_IN_PENDING",
  signInSuccess = "SIGN_IN_SUCCESS",
  signInError = "SIGN_IN_ERROR",

  signUpPending = "SIGN_UP_PENDING",
  signUpSuccess = "SIGN_UP_SUCCESS",
  signUpError = "SIGN_UP_ERROR",

  signOutPending = "SIGN_OUT_PENDING",
  signOutSuccess = "SIGN_OUT_SUCCESS",
  signOutError = "SIGN_OUT_ERROR",

  getUsersPending = "GET_USERS_PENDING",
  getUsersSuccess = "GET_USERS_SUCCESS",
  getUsersError = "GET_USERS_ERROR",

  getUserPending = "GET_USER_PENDING",
  getUserSuccess = "GET_USER_SUCCESS",
  getUserError = "GET_USER_ERROR",

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

//SIGN IN ACTIONS
export const signInPending = createAction<IUserStateContext>(
    UserActionEnums.signInPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
  
  export const signInSuccess = createAction<IUserStateContext, string>(
    UserActionEnums.signInSuccess,
    (token: string) => ({
      isPending: false,
      isSuccess: true,
      isError: false,
      token: token,
    })
  );
  
  export const signInError = createAction<IUserStateContext>(
    UserActionEnums.signInError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );
  
  //SIGN UP ACTIONS
  export const signUpPending = createAction<IUserStateContext>(
    UserActionEnums.signUpPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
  
  export const signUpSuccess = createAction<IUserStateContext, IUser>(
    UserActionEnums.signUpSuccess,
    (user: IUser) => ({
      isPending: false,
      isSuccess: true,
      isError: false,
      user: user,
    })
  );
  
  export const signUpError = createAction<IUserStateContext>(
    UserActionEnums.signUpError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );
  
  //SIGN OUT ACTIONS
  export const signOutPending = createAction<IUserStateContext>(
    UserActionEnums.signOutPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
  
  export const signOutSuccess = createAction<IUserStateContext>(
    UserActionEnums.signOutSuccess,
    () => ({
      isPending: false,
      isSuccess: true,
      isError: false,
    })
  );
  
  export const signOutError = createAction<IUserStateContext>(
    UserActionEnums.signOutError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

// createAction<PayloadType>(actionType, payloadCreator)
//Get all user actions

export const getUsersPending = createAction<IUserStateContext>(
  UserActionEnums.getUsersPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getUsersSuccess = createAction<IUserStateContext, IUser[]>(
  UserActionEnums.getUsersSuccess,

  (user: IUser[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user,
  })
);

export const getUsersError = createAction<IUserStateContext>(
  UserActionEnums.getUsersError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getUserPending = createAction<IUserStateContext>(
  UserActionEnums.getUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getUserSuccess = createAction<IUserStateContext, IUser>(
  UserActionEnums.getUserSuccess,
  (user: IUser) => ({
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

export const createUserPending = createAction<IUserStateContext>(
  UserActionEnums.createUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createUserSuccess = createAction<IUserStateContext, IUser>(
  UserActionEnums.createUserSuccess,
  (user: IUser) => ({
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

export const updateUserPending = createAction<IUserStateContext>(
  UserActionEnums.updateUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateUserSuccess = createAction<IUserStateContext, IUser>(
  UserActionEnums.updateUserSuccess,
  (User: IUser) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    User,
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
  (user: IUser) => ({
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
