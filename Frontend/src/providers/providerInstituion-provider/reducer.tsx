"use client";
import { ProviderInActionEnums } from "./actions";
import { INITIAL_STATE, IProvidersInStateContext } from "./context";
import { handleActions } from "redux-actions";

export const ProviderInReducer = handleActions<
  IProvidersInStateContext,
  IProvidersInStateContext
>(
  {
    // get Provider in an institution by id
    [ProviderInActionEnums.getProvidersInInstitutionPending]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [ProviderInActionEnums.getProvidersInInstitutionSuccess]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),

    [ProviderInActionEnums.getProvidersInInstitutionError]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
