"use client";

import React, { useContext, useReducer } from "react";
import { getAxiosInstace } from "@/utils/axiosInstance";
import { IAppointment, IAppointmentApiResponse, IAppointments } from "./models";
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

  const bookAppointment = async (appointment: IAppointments) => {
    dispatch(bookAppointmentPending());
    const endpoint = "/api/services/app/Appointment/Create";
    return instance
      .post(endpoint, appointment)
      .then((response) => dispatch(bookAppointmentSuccess(response.data)))
      .catch((error) => {
        console.error("Error booking an appointment:", error);
        dispatch(bookAppointmentError());
      });
  };

  const getAppointments = async (): Promise<
    IAppointmentApiResponse[] | null
  > => {
    dispatch(getAllAppointmentPending());
    const endpoint ="api/services/app/Appointment/GetAppointments";
    return instance
      .get(endpoint)
      .then((response) => {
        const result = response.data?.result ?? [];
        dispatch(getAllAppointmentSuccess(result));
        return result;
      })
      .catch((error) => {
        console.error(
          "Fetching appointments failed:",
          error.response?.data || error.message
        );
        dispatch(getAllAppointmentError());
        return null;
      });
  };

  const getAppointmentById = async (id: string) => {
    dispatch(getAppointmentPending());
    const endpoint = `/api/services/app/Appointment/Get/${id}`;
    return instance
      .get(endpoint)
      .then((response) => dispatch(getAppointmentSuccess(response.data)))
      .catch((error) => {
        console.error("Fetching appointment by ID failed:", error);
        dispatch(getAppointmentError());
      });
  };

  const updateAppointment = async (
    appointpointId: string,
    appointmentData: IAppointment
  ) => {
    dispatch(updateAppointmentPending());
    const endpoint = `/api/services/app/Appointment/Update`;
    const payload = { ...appointmentData, id: appointpointId };
    return instance
      .put(endpoint, payload)
      .then((response) => dispatch(updateAppointmentsSuccess(response.data)))
      .catch((error) => {
        console.error(
          "Updating appointment:",
          error.response?.data || error.message
        );
        dispatch(updateAppointmentError());
      });
  };

  const deleteAppointment = async (id: string) => {
    dispatch(deleteAppointmentPending());
    const endpoint = `api/services/app/Appointment/Delete?Id=${id}`;
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
