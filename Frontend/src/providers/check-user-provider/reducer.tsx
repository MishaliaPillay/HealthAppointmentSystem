"use client";
import { handleActions } from "redux-actions";
import { INITIAL_STATE, ICheckUserActionContext } from "./context";
import { CheckUserActionEnums } from "./actions";

export const CheckUserReducer = handleActions<
  ICheckUserActionContext,
  ICheckUserActionContext
>(
  {
    [CheckUserActionEnums.userCheckPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [CheckUserActionEnums.userCheckSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [CheckUserActionEnums.userCheckError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
