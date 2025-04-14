"use client"
import { getAxiosInstace } from "../../app/utils/axiosInstance";
import { IPatient } from "./models";
import {
  INITIAL_STATE,
  PatientActionContext,
  PatientStateContext,
} from "./context";
import { PatientReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
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

  //Register the patient
  const registerPatient = async (Patient: IPatient) => {
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
      })
      .finally(() => {
        console.log("Register user complete");
      });
  };

  //Get All Patients
  const getPatients = async () => {
    dispatch(getPatientsPending());
    const endpoint =  `/Provider/GetAll`;
    await instance
      .post(endpoint)
      .then((response) => {
        dispatch(getPatientsSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getPatientsError());
      })
      .finally(() => {
        console.log("getPatients user complete");
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
      })
      .finally(() => {
        console.log("getPatient user complete");
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
      })
      .finally(() => {
        console.log("updatePatient user complete");
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
      })
      .finally(() => {
        console.log("delete user complete");
      });
  };
  return (
    <PatientStateContext.Provider value={state}>
      <PatientActionContext.Provider
        value={{
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
