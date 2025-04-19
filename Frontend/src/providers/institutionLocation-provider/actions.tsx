"use client";
import { createAction } from "redux-actions";
import { ILocation, ILocationStateContext } from "./context";

export enum LocationActionEnums {
  //For get the location by descrption
  getPlacesByDescriptionPending = "Get_PLACESBYDESC_PENDING",
  getPlacesByDescriptionSuccess = "Get_PLACESBYDESC_SUCCESS",
  getPlacesByDescriptionError = "Get_PLACESBYDESC_ERROR",

  //For get the location by state (region)
  getPlacesByStatePending = "Get_PLACESBYSTATE_PENDING",
  getPlacesByStateSuccess = "Get_PLACESBYSTATE_SUCCESS",
  getPlacesByStateError = "Get_PLACESBYSATATE_ERROR",
}

// get places by description Actions
//get places  by description  Pending
export const getPlacesByDescriptionPending =
  createAction<ILocationStateContext>(
    LocationActionEnums.getPlacesByDescriptionPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

//get places by description  success
export const getPlacesByDescriptionSuccess = createAction<
  ILocationStateContext,
  ILocation[]
>(
  LocationActionEnums.getPlacesByDescriptionSuccess,
  (locations: ILocation) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    locations,
  })
);

//get places by description  is Failed
export const getPlacesByDescriptionError = createAction<ILocationStateContext>(
  LocationActionEnums.getPlacesByDescriptionError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

// get places by State Actions
//get places  by State  Pending
export const getPlacesByStatePending = createAction<ILocationStateContext>(
  LocationActionEnums.getPlacesByStatePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

//get places by state  success
export const getPlacesByStateSuccess = createAction<
  ILocationStateContext,
  ILocation[]
>(LocationActionEnums.getPlacesByStateSuccess, (locations: ILocation) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  locations,
}));

//get places by description  is Failed
export const getPlacesByStateError = createAction<ILocationStateContext>(
  LocationActionEnums.getPlacesByStateSuccess,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
