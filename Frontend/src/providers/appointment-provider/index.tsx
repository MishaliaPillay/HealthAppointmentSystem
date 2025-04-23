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
import { getFcmToken, sendNotification } from "@/utils/firebase";

export const AppointmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(AppointmentReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  // Helper function for sending notification
  const sendAppointmentNotification = async (appointment: IAppointment, action: string) => {
    if (typeof window === 'undefined') return;
    
    // Get the tokens from sessionStorage
    const providerToken = getFcmToken(appointment.providerId);
    const patientToken = getFcmToken(appointment.patientId);
    
    if (!providerToken && !patientToken) {
      console.log('No FCM tokens available for users');
      return;
    }
    
    // Format the appointment date
    const appointmentDate = new Date(appointment.appointmentDate).toLocaleDateString();
    
    // Create notification content based on action
    let title, body;
    switch (action) {
      case 'create':
        title = 'New Appointment';
        body = `New appointment scheduled for ${appointmentDate}`;
        break;
      case 'update':
        title = 'Appointment Updated';
        body = `Your appointment on ${appointmentDate} has been updated`;
        break;
      case 'cancel':
        title = 'Appointment Cancelled';
        body = `Your appointment on ${appointmentDate} has been cancelled`;
        break;
      default:
        title = 'Appointment Notification';
        body = `Regarding your appointment on ${appointmentDate}`;
    }
    
    // Send to both users
    if (providerToken) {
      sendNotification(providerToken, title, body, {
        appointmentId: appointment.id || '',
        type: 'appointment_notification'
      });
    }
    
    if (patientToken) {
      sendNotification(patientToken, title, body, {
        appointmentId: appointment.id || '',
        type: 'appointment_notification'
      });
    }
  };

  const bookAppointment = async (appointment: IAppointment) => {
    dispatch(bookAppointmentPending());
    const endpoint = "/api/services/app/Appointment/Create";

    return instance
      .post(endpoint, appointment)
      .then((response) => {
        dispatch(bookAppointmentSuccess(response.data));
        
        // Send notification after booking
        if (response.data && response.data.result) {
          sendAppointmentNotification(response.data.result, 'create');
        }
        
        return response.data;
      })
      .catch((error) => {
        console.error("Error booking an appointment:", error);
        dispatch(bookAppointmentError());
      });
  };

  const getAppointments = async () => {
    dispatch(getAllAppointmentPending());
    const endpoint = "/api/services/app/Appointment/GetAll";

    return instance
      .get(endpoint)
      .then((response) =>
        dispatch(getAllAppointmentSuccess(response.data.data))
      )
      .catch((error) => {
        console.error("Fetching appointments failed:", error);
        dispatch(getAllAppointmentError());
      });
  };



  // Fetch appointment by ID
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
    id: string,
    appointment: Partial<IAppointment>
  ) => {
    dispatch(updateAppointmentPending());
    const endpoint = `/api/services/app/Appointment/Update/${id}`;

    return instance
      .put(endpoint, appointment)
      .then((response) => {
        dispatch(updateAppointmentsSuccess(response.data));
        
        // Send notification after update
        if (response.data && response.data.result) {
          sendAppointmentNotification(response.data.result, 'update');
        }
        
        return response.data;
      })
      .catch((error) => {
        console.error("Updating appointment by ID failed:", error);
        dispatch(updateAppointmentError());
      });
  }; // Fix: removed the extra closing bracket here

  const deleteAppointment = async (id: string) => {
    dispatch(deleteAppointmentPending());
    
    // First get the appointment details to have info for the notification
    let appointmentData = null;
    try {
      const appointmentResponse = await instance.get(`/api/services/app/Appointment/Get/${id}`);
      appointmentData = appointmentResponse.data.result;
    } catch (error) {
      console.error("Could not fetch appointment before deletion:", error);
    }
    
    const endpoint = `/api/services/app/Appointment/Delete/${id}`;

    return instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteAppointmenttSuccess(response.data));
        
        // Send notification after deletion
        if (appointmentData) {
          sendAppointmentNotification(appointmentData, 'cancel');
        }
        
        return response.data;
      })
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