"use client";

import React, { useEffect, useCallback } from "react";
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
import { requestNotificationPermission } from "@/utils/firebase";
import { shouldSendReminder, getReminderMessage } from "@/utils/appointmentReminder";

export const AppointmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(AppointmentReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getHeaders = useCallback(() => {
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
  }, []);

  const sendNotification = useCallback(async (userId: string, title: string, body: string, severity: string = 'info') => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        await instance.post('/users/fcm-token', { userId, token }, getHeaders());
        await instance.post('/api/send-notification', {
          token,
          notification: {
            title,
            body,
            data: {
              severity,
              timestamp: new Date().toISOString()
            }
          }
        });
      }
    } catch (error) {
      console.error('Failed to send notification:', error instanceof Error ? error.message : 'Unknown error');
    }
  }, [instance, getHeaders]);

  const bookAppointment = async (appointment: IAppointment) => {
    dispatch(bookAppointmentPending());
    try {
      const endpoint = '/api/services/app/Appointment/Create';
      const response = await instance.post(endpoint, appointment, getHeaders());
      dispatch(bookAppointmentSuccess(response.data));
      
      // Send notifications
      await sendNotification(
        appointment.patientId,
        'Appointment Booked',
        `Your appointment has been scheduled for ${appointment.appointmentDate} at ${appointment.appointmentTime}`,
        'success'
      );
      
      if (appointment.providerId) {
        await sendNotification(
          appointment.providerId,
          'New Appointment',
          `New appointment scheduled for ${appointment.appointmentDate} at ${appointment.appointmentTime}`,
          'info'
        );
      }
    } catch (error) {
      console.error("Error booking appointment:", error instanceof Error ? error.message : 'Unknown error');
      dispatch(bookAppointmentError());
    }
  };

  const getAppointments = useCallback(async () => {
    dispatch(getAllAppointmentPending());
    try {
      const endpoint = `/api/services/app/Appointment/GetAll`;
      const headers = getHeaders();
      const response = await instance.get(endpoint, headers);
      dispatch(getAllAppointmentSuccess(response.data.data));
      return response.data.data;
    } catch (error) {
      console.error("fetching appointments failed", error);
      dispatch(getAllAppointmentError());
      return null;
    }
  }, [instance, getHeaders]);

  const getAppointmentById = async (id: string) => {
    dispatch(getAppointmentPending());
    try {
      const endpoint = `/api/services/app/Appointment/get/${id}`;
      const headers = getHeaders();
      const response = await instance.get(endpoint, headers);
      dispatch(getAppointmentSuccess(response.data));
    } catch (error) {
      console.error("fetching appointment by ID failed", error);
      dispatch(getAppointmentError());
    }
  };

  const updateAppointment = useCallback(async (
    id: string,
    appointment: Partial<IAppointment>
  ) => {
    dispatch(updateAppointmentPending());
    try {
      const endpoint = `/api/services/app/Appointment/Update/${id}`;
      const headers = getHeaders();
      const response = await instance.put(endpoint, appointment, headers);
      dispatch(updateAppointmentsSuccess(response.data));

      if (appointment.patientId) {
        await sendNotification(
          appointment.patientId,
          'Appointment Updated',
          `Your appointment has been updated to ${appointment.appointmentDate} at ${appointment.appointmentTime}`,
          'info'
        );
      }

      if (appointment.providerId) {
        await sendNotification(
          appointment.providerId,
          'Appointment Updated',
          `Appointment has been updated to ${appointment.appointmentDate} at ${appointment.appointmentTime}`,
          'info'
        );
      }
    } catch (error) {
      console.error("updating appointment by ID failed", error);
      dispatch(updateAppointmentError());
    }
  }, [instance, getHeaders, sendNotification]);

  const deleteAppointment = async (id: string) => {
    dispatch(deleteAppointmentPending());
    try {
      const endpoint = ` /api/services/app/Appointment/Delete/${id}`;
      const headers = getHeaders();
      const response = await instance.delete(endpoint, headers);
      dispatch(deleteAppointmenttSuccess(response.data));

      const appointment = response.data;
      

      await sendNotification(
        appointment.patientId,
        'Appointment Cancelled',
        'Your appointment has been cancelled',
        'warning'
      );

      if (appointment.providerId) {
        await sendNotification(
          appointment.providerId,
          'Appointment Cancelled',
          `Appointment with ${appointment.patientName} has been cancelled`,
          'warning'
        );
      }
    } catch (error) {
      console.error("deleting appointment by ID failed", error);
      dispatch(deleteAppointmentError());
    }
  };

  const checkReminders = useCallback(async () => {
    try {
      const appointments = await getAppointments();
      if (appointments) {
        appointments.forEach(async (appointment) => {
          if (shouldSendReminder(appointment)) {
            const timeUntilAppointment = new Date(appointment.appointmentDate).getTime() - new Date().getTime();
            const interval = timeUntilAppointment > 60 * 60 * 1000 ? 'DAY_BEFORE' : 'HOUR_BEFORE';
            
            await sendNotification(
              appointment.patientId,
              'Appointment Reminder',
              getReminderMessage(appointment, interval),
              'info'
            );

            await updateAppointment(appointment.id, {
              ...appointment,
              notificationSent: true
            });
          }
        });
      }
    } catch (error) {
      console.error('Error checking reminders:', error);
    }
  }, [getAppointments, sendNotification, updateAppointment]);

  useEffect(() => {
    const reminderInterval = setInterval(checkReminders, 5 * 60 * 1000);
    checkReminders();
    return () => clearInterval(reminderInterval);
  }, [checkReminders]);

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
