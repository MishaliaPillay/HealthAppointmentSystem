"use client"
import { IPatient } from './models';
import {IPatientStateContext } from './context';
import {createAction} from "redux-actions";

// Enum defining the type of actions that can be dispatched
export enum PatientActionEnums {

    getPatientsPending = "GET_PATIENTS_PENDING",
    getPatientsSuccess = "GET_PATIENTS_SUCCESS",
    getPatientsError = "GET_PATIENTS_ERROR",
  
    getPatientPending = "GET_PATIENT_PENDING",
    getPatientSuccess = "GET_PATIENT_SUCCESS",
    getPatientError = "GET_PATIENT_ERROR",
  
   registerPatientPending = "CREATE_PATIENT_PENDING",
   registerPatientSuccess = "CREATE_PATIENT_SUCCESS",
   registerPatientError = "CREATE_PATIENT_ERROR",
  
    updatePatientPending = "UPDATE_=PATIENT_PENDING",
    updatePatientSuccess = "UPDATE_=PATIENT_SUCCESS",
    updatePatientError = "UPDATE_=PATIENT_ERROR",
  
    deletePatientPending = "DELETE_PATIENT_PENDING",
    deletePatientSuccess = "DELETE_PATIENT_SUCCESS",
    deletePatientError = "DELETE_PATIENT_ERROR",
  }

  export const registerPatientPending = createAction<IPatientStateContext>(
    PatientActionEnums.registerPatientPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
  
  export const registerPatientSuccess = createAction<
    IPatientStateContext,
    IPatient
  >(PatientActionEnums.registerPatientSuccess, (Patient: IPatient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Patient,
  }));

  export const registerPatientError = createAction<IPatientStateContext>(
    PatientActionEnums.registerPatientError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );