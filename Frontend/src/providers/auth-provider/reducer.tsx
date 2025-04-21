"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IAuthStateContext } from "./context";
import { AuthActionEnums } from "./actions";
export const AuthReducer = handleActions<IAuthStateContext, IAuthStateContext>(
  {
    [AuthActionEnums.signInPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.signInSuccess]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    [AuthActionEnums.signInError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.signUpError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.signUpSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.signUpPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
