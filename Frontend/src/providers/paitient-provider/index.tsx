"use client";
import { getAxiosInstace } from "../../app/utils/axiosInstance";
import { IPatient, IPatientRegisteration, UpdatePatientDto } from "./models";
import {
  INITIAL_STATE,
  PatientActionContext,
  PatientStateContext,
} from "./context";
import { PatientReducer } from "./reducer";
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
  ): Promise<IPatient | null> => {
    dispatch(getCurrentPatientPending());
    const endpoint = `/api/services/app/Patient/GetCurrentPatient?userId=${userId}`;
    return instance
      .get(endpoint)
      .then((response) => {
        if (response?.data?.result) {
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

  // Get Patient
  const getPatient = async (patientId: string): Promise<IPatient | null> => {
    dispatch(getPatientPending());
    const endpoint = `/api/services/app/Patient/Get?Id=${patientId}`;
    return instance
      .get(endpoint)
      .then((response) => {
        dispatch(getPatientsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        dispatch(getPatientError());
        return null;
      });
  };
  // Register the patient
  const registerPatient = async (Patient: IPatientRegisteration) => {
    dispatch(registerPatientPending());
    const endpoint = `/api/services/app/Patient/Create`;
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

  // Get All Patients
  const getPatients = async () => {
    dispatch(getPatientsPending());
    const endpoint = `/api/services/app/Patient/GetAll`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getPatientsSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getPatientsError());
      });
  };

  const updatePatient = async (
    patientId: string,
    patientData: UpdatePatientDto
  ) => {
    dispatch(updatePatientPending());
    const payload = {
      ...patientData,
      id: patientId,
    };
    const endpoint = `/api/services/app/Patient/UpdatePatient`;
    await instance
      .put(endpoint, payload)
      .then((response) => {
        dispatch(updatePatientSuccess(response.data));
      })
      .catch((error) => {
        console.error("Update error:", error.response?.data || error.message);
        dispatch(updatePatientError());
      });
  };

  // Delete Patient
  const deletePatientbyId = async (patientId: string) => {
    dispatch(deletePatientPending());
    const endpoint = `/api/services/app/Patient/Delete?Id=${patientId}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deletePatientSuccess(response.data));
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
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
