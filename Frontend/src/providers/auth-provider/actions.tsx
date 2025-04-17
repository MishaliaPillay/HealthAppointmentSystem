"use client";
import { IAuth } from "./models";
import { IAuthStateContext } from "./context";
import { createAction } from "redux-actions";
//make enums defining the actions that can be dispatched

export enum AuthActionEnums {
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

  userCheckPending = "USER_CHECK_PENDING",
  userCheckSuccess = "USER_CHECK_SUCCESS",
  userCheckError = "USER_CHECK_ERROR",
}
//SIGN UP ACTIONS
export const signUpPending = createAction<IAuthStateContext>(
  AuthActionEnums.signUpPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const signUpSuccess = createAction<IAuthStateContext, IAuth>(
  AuthActionEnums.signUpSuccess,
  (Auth: IAuth) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Auth: Auth,
  })
);

export const signUpError = createAction<IAuthStateContext>(
  AuthActionEnums.signUpError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//SIGN IN ACTIONS
export const signInPending = createAction<IAuthStateContext>(
  AuthActionEnums.signInPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const signInSuccess = createAction<IAuthStateContext, string>(
  AuthActionEnums.signInSuccess,
  (token: string) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    token: token,
  })
);
export const signInError = createAction<IAuthStateContext>(
  AuthActionEnums.signInError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//SIGN OUT ACTIONS
export const signOutPending = createAction<IAuthStateContext>(
  AuthActionEnums.signOutPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const signOutSuccess = createAction<IAuthStateContext>(
  AuthActionEnums.signOutSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
  })
);

export const signOutError = createAction<IAuthStateContext>(
  AuthActionEnums.signOutError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
export const userCheckPending = createAction<IAuthStateContext>(
  AuthActionEnums.userCheckPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const userCheckSuccess = createAction<IAuthStateContext>(
  AuthActionEnums.userCheckSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
  })
);

export const userCheckError = createAction<IAuthStateContext>(
  AuthActionEnums.userCheckError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
