"use client"
import { IPatient } from './models';
import {IPatientStateContext } from './context';
import {createAction} from "redux-actions";

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

  
//Get All Paitients
//Multiple Paitients
export const getPatientsPending = createAction<IPatientStateContext>(
  PatientActionEnums.getPatientsPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

// createAction<ReturnType, PayloadType>
export const getPatientsSuccess = createAction<
  IPatientStateContext, 
  IPatient[]           
>(
  PatientActionEnums.getPatientsSuccess,
  // Receives Patients array and returns state with Patients
  (Patients: IPatient[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Patients, 
  })
);

export const getPatientsError = createAction<IPatientStateContext>(
  PatientActionEnums.getPatientsError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);



//Get Single Paitient
export const getPatientError = createAction<IPatientStateContext>(
  PatientActionEnums.getPatientsError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getPatientPending = createAction<IPatientStateContext>(
  PatientActionEnums.getPatientPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getPatientSuccess = createAction<IPatientStateContext, IPatient>(
  PatientActionEnums.getPatientSuccess,
  (Patient: IPatient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Patient,
  })
);

  //Registering The Patient
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

//Update The Patient
export const updatePatientPending = createAction<IPatientStateContext>(
  PatientActionEnums.updatePatientPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updatePatientSuccess = createAction<
  IPatientStateContext,
  IPatient
>(PatientActionEnums.updatePatientSuccess, (Patient: IPatient) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Patient,
}));

export const updatePatientError = createAction<IPatientStateContext>(
  PatientActionEnums.updatePatientError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Delete Patient
  export const deletePatientPending = createAction<IPatientStateContext>(
    PatientActionEnums.deletePatientPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
  
  export const deletePatientSuccess = createAction<
    IPatientStateContext,
    IPatient
  >(PatientActionEnums.deletePatientSuccess, (Patient: IPatient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Patient,
  }));
  
  export const deletePatientError = createAction<IPatientStateContext>(
    PatientActionEnums.deletePatientError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

