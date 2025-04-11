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
import axios from "axios";
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
      const endpoint = "the endpoint Link";
      const response = await axios.post(endpoint, appointment, getHeaders());
      dispatch(bookAppointmentSuccess([response.data]));
    } catch (error) {
      console.error("Error booking an Appointment:", error);
      dispatch(bookAppointmentError());
    }
  };

  const getAppointments = async () => {
    dispatch(getAllAppointmentPending());
    try {
      const endpoint = "end point for the get all";
      const headers = getHeaders();
      const response = await axios.get(endpoint, headers);
      dispatch(getAllAppointmentSuccess(response.data.data));
      console.log(response.data.data);
    } catch (error) {
      console.error("fetching appointments failed", error);
      dispatch(getAllAppointmentError());
    }
  };

  const getAppointmentById = async (id: string) => {
    dispatch(getAppointmentPending());
    try {
      const endpoint = `endpoint of the fetvhing appointment by id/${id}`;
      const response = await axios.get(endpoint, getHeaders());
      dispatch(getAppointmentSuccess(response.data));
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Appointment by ID:", error);
      dispatch(getAppointmentError());
    }
  };

  const updateAppointment = async (
    id: string,
    appointment: Partial<IAppointment>
  ) => {
    dispatch(updateAppointmentPending());
    try {
      const endpoint = `endpoint of the updating appointment/${id}`;
      const response = await axios.put(endpoint, appointment, getHeaders());
      dispatch(updateAppointmentsSuccess(response.data));
      console.log(response.data);
    } catch (error) {
      console.error("Error updating Appointment by ID:", error);
      dispatch(updateAppointmentError());
    }
  };

  const deleteAppointment = async (id: string) => {
    dispatch(deleteAppointmentPending());
    try {
      const endpoint = `endpoint of the deleting appointment/${id}`;
      const response = await axios.delete(endpoint, getHeaders());
      dispatch(deleteAppointmenttSuccess(response.data));
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting Appointment by ID:", error);
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
