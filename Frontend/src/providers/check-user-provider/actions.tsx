"use client";

import { ICheckUserStateContext } from "./context";
import { createAction } from "redux-actions";
//make enums defining the actions that can be dispatched

export enum CheckUserActionEnums {
  // define 3 states for each action (pending , success, error)

  userCheckPending = "USER_CHECK_PENDING",
  userCheckSuccess = "USER_CHECK_SUCCESS",
  userCheckError = "USER_CHECK_ERROR",
}
//SIGN UP ACTIONS

export const userCheckPending = createAction<ICheckUserStateContext>(
  CheckUserActionEnums.userCheckPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const userCheckSuccess = createAction<ICheckUserStateContext>(
  CheckUserActionEnums.userCheckSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
  })
);

export const userCheckError = createAction<ICheckUserStateContext>(
  CheckUserActionEnums.userCheckError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
