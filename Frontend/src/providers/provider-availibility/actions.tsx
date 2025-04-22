"use client";
import { createAction } from "redux-actions";
import {
  IProvidersAvailability,
  IProviderAvailabilityStateContext,
} from "./context";

export enum ProviderAvailabilityActionEnums {
  fetchAvailabilityPending = "FETCH_AVAILABILITY_PENDING",
  fetchAvailabilitySuccess = "FETCH_AVAILABILITY_SUCCESS",
  fetchAvailabilityError = "FETCH_AVAILABILITY_ERROR",

  createAvailabilityPending = "CREATE_AVAILABILITY_PENDING",
  createAvailabilitySuccess = "CREATE_AVAILABILITY_SUCCESS",
  createAvailabilityError = "CREATE_AVAILABILITY_ERROR",

  updateAvailabilityPending = "UPDATE_AVAILABILITY_PENDING",
  updateAvailabilitySuccess = "UPDATE_AVAILABILITY_SUCCESS",
  updateAvailabilityError = "UPDATE_AVAILABILITY_ERROR",
}

// get providers in a certain instition{hospital/clinics etc}
//get providers in institution Pending
export const fetchAvailabilityPending =
  createAction<IProviderAvailabilityStateContext>(
    ProviderAvailabilityActionEnums.fetchAvailabilityPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const fetchAvailabilitySuccess = createAction<
  IProviderAvailabilityStateContext,
  { result: IProvidersAvailability[] }
>(ProviderAvailabilityActionEnums.fetchAvailabilitySuccess, (data) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  providers: data,
}));

export const fetchAvailabilityError =
  createAction<IProviderAvailabilityStateContext>(
    ProviderAvailabilityActionEnums.fetchAvailabilityError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );
export const createAvailabilityPending =
  createAction<IProviderAvailabilityStateContext>(
    ProviderAvailabilityActionEnums.createAvailabilityPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const createAvailabilitySuccess =
  createAction<IProviderAvailabilityStateContext>(
    ProviderAvailabilityActionEnums.createAvailabilitySuccess,
    () => ({ isPending: false, isSuccess: true, isError: false })
  );

export const createAvailabilityError =
  createAction<IProviderAvailabilityStateContext>(
    ProviderAvailabilityActionEnums.createAvailabilityError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );
export const updateAvailabilityPending =
  createAction<IProviderAvailabilityStateContext>(
    ProviderAvailabilityActionEnums.updateAvailabilityPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const updateAvailabilitySuccess =
  createAction<IProviderAvailabilityStateContext>(
    ProviderAvailabilityActionEnums.updateAvailabilitySuccess,
    () => ({ isPending: false, isSuccess: true, isError: false })
  );

export const updateAvailabilityError =
  createAction<IProviderAvailabilityStateContext>(
    ProviderAvailabilityActionEnums.updateAvailabilityError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );