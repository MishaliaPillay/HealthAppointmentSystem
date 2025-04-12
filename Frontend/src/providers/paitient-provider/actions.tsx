"use client"
import { IPaitient } from './models';
import {IPaitientStateContext } from './context';
import {createAction} from "redux-actions";

// Enum defining the type of actions that can be dispatched
export enum PaitientActionEnums {

    getPaitientsPending = "GET_PAITIENTS_PENDING",
    getPaitientsSuccess = "GET_PAITIENTS_SUCCESS",
    getPaitientsError = "GET_PAITIENTS_ERROR",
  
    getPaitientPending = "GET_PAITIENT_PENDING",
    getPaitientSuccess = "GET_PAITIENT_SUCCESS",
    getPaitientError = "GET_PAITIENT_ERROR",
  
   registerPaitientPending = "CREATE_PAITIENT_PENDING",
   registerPaitientSuccess = "CREATE_PAITIENT_SUCCESS",
   registerPaitientError = "CREATE_PAITIENT_ERROR",
  
    updatePaitientPending = "UPDATE_=PAITIENT_PENDING",
    updatePaitientSuccess = "UPDATE_=PAITIENT_SUCCESS",
    updatePaitientError = "UPDATE_=PAITIENT_ERROR",
  
    deletePaitientPending = "DELETE_PAITIENT_PENDING",
    deletePaitientSuccess = "DELETE_PAITIENT_SUCCESS",
    deletePaitientError = "DELETE_PAITIENT_ERROR",
  }

  export const registerPaitientPending = createAction<IPaitientStateContext>(
    PaitientActionEnums.registerPaitientPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
  
  export const registerPaitientSuccess = createAction<
    IPaitientStateContext,
    IPaitient
  >(PaitientActionEnums.registerPaitientSuccess, (paitient: IPaitient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    paitient,
  }));

  export const registerPaitientError = createAction<IPaitientStateContext>(
    PaitientActionEnums.registerPaitientError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );