"use client"
import { IPaitient } from './models';
import { IPaitientActionContext, IPaitientStateContext } from './context';
import {createAction} from "redux-actions";

// Enum defining the type of actions that can be dispatched
export enum PaitientActionEnums {

    getPaitientsPending = "GET_PAITIENTS_PENDING",
    getPaitientsSuccess = "GET_PAITIENTS_SUCCESS",
    getPaitientsError = "GET_PAITIENTS_ERROR",
  
    getPaitientPending = "GET_PAITIENT_PENDING",
    getPaitientSuccess = "GET_PAITIENT_SUCCESS",
    getPaitientError = "GET_PAITIENT_ERROR",
  
    createPaitientPending = "CREATE_PAITIENT_PENDING",
    createPaitientSuccess = "CREATE_PAITIENT_SUCCESS",
    createPaitientError = "CREATE_PAITIENT_ERROR",
  
    updatePaitientPending = "UPDATE_=PAITIENT_PENDING",
    updatePaitientSuccess = "UPDATE_=PAITIENT_SUCCESS",
    updatePaitientError = "UPDATE_=PAITIENT_ERROR",
  
    deletePaitientPending = "DELETE_PAITIENT_PENDING",
    deletePaitientSuccess = "DELETE_PAITIENT_SUCCESS",
    deletePaitientError = "DELETE_PAITIENT_ERROR",
  }

  export const createPaitientPending = createAction<IPaitientStateContext>(
    PaitientActionEnums.createPaitientPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
  
  export const createPaitientSuccess = createAction<
    IPaitientStateContext,
    IPaitient
  >(PaitientActionEnums.createPaitientSuccess, (paitient: IPaitient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    paitient,
  }));

  export const createPaitientError = createAction<IPaitientStateContext>(
    PaitientActionEnums.createPaitientError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );