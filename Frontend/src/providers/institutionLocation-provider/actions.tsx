"use client";
import { createAction } from "redux-actions";
import { ILocation, ILocationStateContext, IInstitution } from "./context";

export enum LocationActionEnums {
  //For get the location by descrption
  getPlacesByDescriptionPending = "Get_PLACESBYDESC_PENDING",
  getPlacesByDescriptionSuccess = "Get_PLACESBYDESC_SUCCESS",
  getPlacesByDescriptionError = "Get_PLACESBYDESC_ERROR",

  //For get the location by state (region)
  getPlacesByStatePending = "Get_PLACESBYSTATE_PENDING",
  getPlacesByStateSuccess = "Get_PLACESBYSTATE_SUCCESS",
  getPlacesByStateError = "Get_PLACESBYSATATE_ERROR",

  //For get all
  getAllPlacesPending = "Get_ALLPLACES_PENDING",
  getAllPlacesSuccess = "Get__ALLPLACES_SUCCESS",
  getAllPlacesError = "Get__ALLPLACES_ERROR",
  getInstitutionsWithSpecialtyPending = "GET_INSTITUTIONS_WITH_SPECIALTY_PENDING",
  getInstitutionsWithSpecialtySuccess = "GET_INSTITUTIONS_WITH_SPECIALTY_SUCCESS",
  getInstitutionsWithSpecialtyError = "GET_INSTITUTIONS_WITH_SPECIALTY_ERROR",
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

export const getAllPlacesPending = createAction<ILocationStateContext>(
  LocationActionEnums.getAllPlacesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

//get places by description  success
export const getAllPlacesSuccess = createAction<
  ILocationStateContext,
  ILocation[]
>(LocationActionEnums.getAllPlacesSuccess, (locations: ILocation) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  locations,
}));

//get places by description  is Failed
export const getAllPlacesError = createAction<ILocationStateContext>(
  LocationActionEnums.getAllPlacesError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getInstitutionsWithSpecialtyPending =
  createAction<ILocationStateContext>(
    LocationActionEnums.getInstitutionsWithSpecialtyPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const getInstitutionsWithSpecialtySuccess = createAction<
  ILocationStateContext,
  IInstitution[]
>(LocationActionEnums.getInstitutionsWithSpecialtySuccess, (institutions) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  institutions,
}));

export const getInstitutionsWithSpecialtyError =
  createAction<ILocationStateContext>(
    LocationActionEnums.getInstitutionsWithSpecialtyError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );
