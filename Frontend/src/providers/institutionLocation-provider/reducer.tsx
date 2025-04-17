"use client";
import { LocationActionEnums } from "./actions";
import { ILocationStateContext, INITIAL_STATE } from "./context";
import { handleActions } from "redux-actions";

export const LocationReducer = handleActions<
  ILocationStateContext,
  ILocationStateContext
>(
  {
    // get places by description
    [LocationActionEnums.getPlacesByDescriptionPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LocationActionEnums.getPlacesByDescriptionSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [LocationActionEnums.getPlacesByDescriptionError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //get places by state
    [LocationActionEnums.getPlacesByStatePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LocationActionEnums.getPlacesByStateSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [LocationActionEnums.getPlacesByStateError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //get places by state
    [LocationActionEnums.getAllPlacesPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LocationActionEnums.getAllPlacesSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [LocationActionEnums.getAllPlacesError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
