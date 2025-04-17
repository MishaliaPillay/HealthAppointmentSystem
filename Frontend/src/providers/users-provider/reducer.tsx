"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IUserStateContext } from "./context";
import { UserActionEnums } from "./actions";

export const UserReducer = handleActions<
  IUserStateContext,
  Partial<IUserStateContext>
>(
  {
    [UserActionEnums.getUsersPending]: (state, action) => ({
      ...state,
      ...(action.payload ?? {}),
    }),
    [UserActionEnums.getUsersSuccess]: (state, action) => ({
      ...state,
      ...(action.payload ?? {}),
    }),
    [UserActionEnums.getUsersError]: (state, action) => ({
      ...state,
      ...(action.payload ?? {}),
    }),

    [UserActionEnums.getUserPending]: (state, action) => ({
      ...state,
      ...(action.payload ?? {}),
    }),
    [UserActionEnums.getUserSuccess]: (state, action) => ({
      ...state,
      ...(action.payload ?? {}),
    }),
    [UserActionEnums.getUserError]: (state, action) => ({
      ...state,
      ...(action.payload ?? {}),
    }),

    [UserActionEnums.getCurrentUserPending]: (state, action) => ({
      ...state,
      ...(action.payload ?? {}),
    }),
    [UserActionEnums.getCurrentUserSuccess]: (state, action) => ({
      ...state,
      ...(action.payload ?? {}),
    }),
    [UserActionEnums.getCurrentUserError]: (state, action) => ({
      ...state,
      ...(action.payload ?? {}),
    }),
  },
  INITIAL_STATE
);
