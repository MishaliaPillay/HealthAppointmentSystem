"use client";
import { ProviderAvailabilityActionEnums } from "./actions";
import { INITIAL_STATE, IProviderAvailabilityStateContext } from "./context";
import { handleActions } from "redux-actions";

export const ProviderAvailabilityReducer = handleActions<
  IProviderAvailabilityStateContext,
  IProviderAvailabilityStateContext
>(
  {
    // Fetch Availability
    [ProviderAvailabilityActionEnums.fetchAvailabilityPending]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),

    [ProviderAvailabilityActionEnums.fetchAvailabilitySuccess]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),

    [ProviderAvailabilityActionEnums.fetchAvailabilityError]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),

    // Create Availability
    [ProviderAvailabilityActionEnums.createAvailabilityPending]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),

    [ProviderAvailabilityActionEnums.createAvailabilitySuccess]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),

    [ProviderAvailabilityActionEnums.createAvailabilityError]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),

    // Update Availability
    [ProviderAvailabilityActionEnums.updateAvailabilityPending]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),

    [ProviderAvailabilityActionEnums.updateAvailabilitySuccess]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),

    [ProviderAvailabilityActionEnums.updateAvailabilityError]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
