"use client";
import { getAxiosInstace } from "../../app/utils/axiosInstance";
import { IPatient, IPatientRegisteration } from "./models";
import {
  INITIAL_STATE,
  PatientActionContext,
  PatientStateContext,
} from "./context";
import { PatientReducer } from "./reducer";
import axios from "axios";
import { useContext, useReducer } from "react";
import {
  getCurrentPatientPending,
  getCurrentPatientSuccess,
  getCurrentPatientError,
  registerPatientPending,
  registerPatientError,
  registerPatientSuccess,
  getPatientPending,
  getPatientsPending,
  getPatientsSuccess,
  getPatientsError,
  getPatientError,
  updatePatientPending,
  updatePatientSuccess,
  updatePatientError,
  deletePatientPending,
  deletePatientSuccess,
} from "./actions";

export const PatientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(PatientReducer, INITIAL_STATE);
  const instance = getAxiosInstace();
  // Get current patient
  const getCurrentPatient = async (
    userId: number
  ): // userId: number
  Promise<IPatient | null> => {
    dispatch(getCurrentPatientPending());
    const endpoint = `https://localhost:44311/api/services/app/Patient/GetCurrentPatient?id=${userId}`;
    // const endpoint =
    //   "https://localhost:44311/api/services/app/Patient/GetCurrentPatient";

    return axios
      .get(endpoint)
      .then((response) => {
        debugger;
        if (response?.data?.result) {
          debugger;
          dispatch(getCurrentPatientSuccess(response.data.result));
          return response.data.result;
        } else {
          console.warn("No patient data found in response");
          dispatch(getCurrentPatientError());
          return null;
        }
      })
      .catch((error) => {
        console.error("Error fetching current patient:", error);
        dispatch(getCurrentPatientError());
        return null;
      });
  };

  //Register the patient
  const registerPatient = async (Patient: IPatientRegisteration) => {
    dispatch(registerPatientPending());
    const endpoint = `/Patient/Create`;
    await instance
      .post(endpoint, Patient)
      .then((response) => {
        dispatch(registerPatientSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(registerPatientError());
      });
  };

  //Get All Patients
  const getPatients = async () => {
    dispatch(getPatientsPending());
    const endpoint = `/Provider/GetAll`;
    await instance
      .post(endpoint)
      .then((response) => {
        dispatch(getPatientsSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getPatientsError());
      });
  };

  //Get Patient
  const getPatient = async (patientId: string) => {
    dispatch(getPatientPending());
    const endpoint = `Provider/Get?Id=${patientId}`;
    await instance
      .post(endpoint, patientId)
      .then((response) => {
        dispatch(getPatientsSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getPatientError());
      });
  };

  //Update Paitient
  const updatePatient = async (patient: IPatient) => {
    dispatch(updatePatientPending());
    const endpoint = `/Provider/Update`;
    await instance
      .post(endpoint, patient)
      .then((response) => {
        dispatch(updatePatientSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updatePatientError());
      });
  };

  //Delete Patient
  const deletePatientbyId = async (patientId: string) => {
    dispatch(deletePatientPending());
    const endpoint = `/Provider/Delete?Id=${patientId}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deletePatientSuccess(response.data));
      })
      .catch((error) => {
        dispatch(deletePatientSuccess(error.data));
      });
  };
  return (
    <PatientStateContext.Provider value={state}>
      <PatientActionContext.Provider
        value={{
          getCurrentPatient,
          registerPatient,
          getPatients,
          getPatient,
          updatePatient,
          deletePatientbyId,
        }}
      >
        {children}
      </PatientActionContext.Provider>
    </PatientStateContext.Provider>
  );
};
export const usePatientState = () => {
  const context = useContext(PatientStateContext);
  if (!context) {
    throw new Error("usePatientState must be used within a PatientProvider");
  }
  return context;
};

export const usePatientActions = () => {
  const context = useContext(PatientActionContext);
  if (!context) {
    throw new Error(
      "PatientActionContext must be used within a PatientProvider"
    );
  }
  return context;
};
