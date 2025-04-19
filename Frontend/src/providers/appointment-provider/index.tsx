"use client";

import React from "react";
import { useContext, useReducer } from "react";
import {
  AppointmentActionContext,
  AppointmentStateContext,
  IAppointment,
  INITIAL_STATE,
} from "./context";
import { AppointmentReducer } from "./reducers";
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
import { getAxiosInstace } from "@/utils/axiosInstance";

export const AppointmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(AppointmentReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  //token into the session storage
  const getHeaders = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in session storage");
    }
    return {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
  };

  // booking an Appointment
  const bookAppointment = async (appointment: IAppointment) => {
    dispatch(bookAppointmentPending());
    try {
      const endpoint = `/rest of the url here`;
      const response = await instance.post(endpoint, appointment, getHeaders());
      dispatch(bookAppointmentSuccess(response.data));
    } catch (error) {
      console.error("Error booking an Appointment:", error);
      dispatch(bookAppointmentError());
    }
  };
  const getAppointments = async () => {
    dispatch(getAllAppointmentPending());
    try {
      const endpoint = `/rest of the url here`;
      const headers = getHeaders();
      const response = await instance.get(endpoint, headers);
      dispatch(getAllAppointmentSuccess(response.data.data));
    } catch (error) {
      console.error("fetching appointments failed", error);
      dispatch(getAllAppointmentError());
    }
  };

  const getAppointmentById = async (id: string) => {
    dispatch(getAppointmentPending());
    try {
      const endpoint = `rest url of the fetching appointment by id/${id}`;
      const headers = getHeaders();
      const response = await instance.get(endpoint, headers);
      dispatch(getAppointmentSuccess(response.data));
    } catch (error) {
      console.error("fetching appointment by ID failed", error);
      dispatch(getAppointmentError());
    }
  };

  const updateAppointment = async (
    id: string,
    appointment: Partial<IAppointment>
  ) => {
    dispatch(updateAppointmentPending());
    try {
      const endpoint = `rest url of the updating appointment/${id}`;
      const headers = getHeaders();
      const response = await instance.put(endpoint, appointment, headers);
      dispatch(updateAppointmentsSuccess(response.data));
    } catch (error) {
      console.error("updating appointment by ID failed", error);
      dispatch(updateAppointmentError());
    }
  };

  const deleteAppointment = async (id: string) => {
    dispatch(deleteAppointmentPending());
    try {
      const endpoint = ` rest url of the deleting appointment/${id}`;
      const headers = getHeaders();
      const response = await instance.delete(endpoint, headers);
      dispatch(deleteAppointmenttSuccess(response.data));
    } catch (error) {
      console.error("deleting appointment by ID failed", error);
      dispatch(deleteAppointmentError());
    }
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
  if (!context) {
    throw new Error(
      "useAppointmentState must be used within a AppointmentProvider"
    );
  }
  return context;
};

export const useAppointmentActions = () => {
  const context = useContext(AppointmentActionContext);
  if (!context) {
    throw new Error(
      "AppointmentActionContext must be used within a AppointmentProvider"
    );
  }
  return context;
};
