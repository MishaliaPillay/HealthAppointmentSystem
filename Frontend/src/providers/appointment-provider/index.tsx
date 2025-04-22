"use client";

import React, { useContext, useReducer } from "react";
import { getAxiosInstace } from "@/utils/axiosInstance";
import { IAppointment } from "./models";
import { AppointmentReducer } from "./reducers";
import {
  AppointmentActionContext,
  AppointmentStateContext,
  INITIAL_STATE,
} from "./context";
import {
  bookAppointmentError,
  bookAppointmentPending,
  bookAppointmentSuccess,
  deleteAppointmentError,
  deleteAppointmentPending,
  deleteAppointmenttSuccess,
  getAllAppointmentError,
  getAllAppointmentPending,
  getAllAppointmentSuccess,
  getAppointmentError,
  getAppointmentPending,
  getAppointmentSuccess,
  updateAppointmentError,
  updateAppointmentPending,
  updateAppointmentsSuccess,
} from "./actions";

export const AppointmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(AppointmentReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const bookAppointment = async (appointment: IAppointment) => {
    dispatch(bookAppointmentPending());
    const endpoint = "/Appointment/Create";

    return instance
      .post(endpoint, appointment)
      .then((response) => dispatch(bookAppointmentSuccess(response.data)))
      .catch((error) => {
        console.error("Error booking an appointment:", error);
        dispatch(bookAppointmentError());
      });
  };

const getAppointments = async (): Promise<IAppointment[]> => {
  dispatch(getAllAppointmentPending());
  const endpoint = "/Appointment/GetAll";

  try {
    const response = await instance.get(endpoint);

    if (response.data?.data) {
      dispatch(getAllAppointmentSuccess(response.data.data));
      return response.data.data; // Ensure data is returned
    } else {
      dispatch(getAllAppointmentError());
      return []; // Return an empty array if data is missing
    }
  } catch (error) {
    console.error("Fetching appointments failed:", error);
    dispatch(getAllAppointmentError());
    return []; // Return an empty array on failure
  }
};
  const getAppointmentById = async (id: string) => {
    dispatch(getAppointmentPending());
    const endpoint = `/Appointment/Get/${id}`;

    return instance
      .get(endpoint)
      .then((response) => dispatch(getAppointmentSuccess(response.data)))
      .catch((error) => {
        console.error("Fetching appointment by ID failed:", error);
        dispatch(getAppointmentError());
      });
  };

 const updateAppointment = async (id: string, appointment: Partial<IAppointment>) => {
  dispatch(updateAppointmentPending());
  const endpoint = `/Appointment/Update`; // Corrected endpoint

  const payload = {
    ...appointment,
    id, // Include ID in the request body, NOT the URL
  };

  return instance
    .put(endpoint, payload)
    .then((response) => {
      dispatch(updateAppointmentsSuccess(response.data));
    })
    .catch((error) => {
      console.error("Updating appointment failed:", error.response?.data || error.message);
      dispatch(updateAppointmentError());
    });
};
  const deleteAppointment = async (id: string) => {
    dispatch(deleteAppointmentPending());
    const endpoint = `/Appointment/Delete/${id}`;

    return instance
      .delete(endpoint)
      .then((response) => dispatch(deleteAppointmenttSuccess(response.data)))
      .catch((error) => {
        console.error("Deleting appointment by ID failed:", error);
        dispatch(deleteAppointmentError());
      });
  };

  return (
    <AppointmentStateContext.Provider value={state}>
      <AppointmentActionContext.Provider
        value={{
          bookAppointment,
          getAppointments,
          getAppointmentById,
          updateAppointment,
          deleteAppointment,
        }}
      >
        {children}
      </AppointmentActionContext.Provider>
    </AppointmentStateContext.Provider>
  );
};

export const useAppointmentState = () => {
  const context = useContext(AppointmentStateContext);
  if (!context)
    throw new Error(
      "useAppointmentState must be used within an AppointmentProvider"
    );
  return context;
};

export const useAppointmentActions = () => {
  const context = useContext(AppointmentActionContext);
  if (!context)
    throw new Error(
      "useAppointmentActions must be used within an AppointmentProvider"
    );
  return context;
};
