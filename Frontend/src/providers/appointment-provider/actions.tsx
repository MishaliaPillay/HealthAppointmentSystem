"use client";
import { IAppointmentStateContext } from "./context";
import {IAppointment} from "./models"
import { createAction } from "redux-actions";

export enum AppointmentActionEnums {
  //For Booking the Appointment
  bookAppointmentPending = "BOOK_APPOINTMENT_PENDING",
  bookAppointmentSuccess = "BOOK_APPOINTMENT_SUCCESS",
  bookAppointmentError = "BOOK_APPOINTMENT_ERROR",

  //GetAll Appointments
  getAllAppointmentPending = "GET_ALLAPPOINTMENTS_PENDING",
  getAllAppointmentSuccess = "GET_ALLAPPOINTMENTS_SUCCESS",
  getAllAppointmentError = "GET_ALLAPPOINTMENTS_ERROR",

  //Get a single Appointment by the id
  getAppointmentPending = "GET_APPOINTMENTS_PENDING",
  getAppointmentSuccess = "GET_APPOINTMENTS_SUCCESS",
  getAppointmentError = "GET_APPOINTMENTS_ERROR",

  //Update Appointments
  updateAppointmentPending = "UPDATE_APPOINTMENTS_PENDING",
  updateAppointmentSuccess = "UPDATE_APPOINTMENTS_SUCCESS",
  updateAppointmentError = "UPDATE_APPOINTMENTS_ERROR",

  // Delete Appointments
  deleteAppointmentPending = "DELETE_APPOINTMENTS_PENDING",
  deleteAppointmenttSuccess = "DELETE_APPOINTMENTS_SUCCESS",
  deleteAppointmentError = "DELETE_APPOINTMENTS_ERROR",
}

// Make an appointment Actions
//Booking  Appointment Pending
export const bookAppointmentPending = createAction<IAppointmentStateContext>(
  AppointmentActionEnums.bookAppointmentPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

//Booking  Appointment success
export const bookAppointmentSuccess = createAction<
  IAppointmentStateContext,
  IAppointment
>(
  AppointmentActionEnums.bookAppointmentSuccess,
  (appointment: IAppointment) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    appointment,
  })
);

//Booking  Appointment is Failed
export const bookAppointmentError = createAction<IAppointmentStateContext>(
  AppointmentActionEnums.bookAppointmentError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);


//Get all   Appointment Pending
export const getAllAppointmentPending = createAction<IAppointmentStateContext>(
  AppointmentActionEnums.getAllAppointmentPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

//Get all   Appointment success
export const getAllAppointmentSuccess = createAction<
  IAppointmentStateContext,
  IAppointment[]
>(
  AppointmentActionEnums.getAllAppointmentSuccess,
  (appointment: IAppointment) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    appointment,
  })
);

//Get all   Appointment Failed
export const getAllAppointmentError = createAction<IAppointmentStateContext>(
  AppointmentActionEnums.getAllAppointmentError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Get appointment  by id Actions
//Get appointment  by id  Pending
export const getAppointmentPending = createAction<IAppointmentStateContext>(
  AppointmentActionEnums.getAppointmentPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

//Get appointment  by id  success
export const getAppointmentSuccess = createAction<
  IAppointmentStateContext,
  IAppointment
>(
  AppointmentActionEnums.getAppointmentSuccess,
  (appointment: IAppointment) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    appointment,
  })
);

//Get appointment  by id Failed
export const getAppointmentError = createAction<IAppointmentStateContext>(
  AppointmentActionEnums.getAppointmentError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Update Appointment Actions
//Update  Appointment Pending
export const updateAppointmentPending = createAction<IAppointmentStateContext>(
  AppointmentActionEnums.updateAppointmentPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

//Update  Appointment success
export const updateAppointmentsSuccess = createAction<
  IAppointmentStateContext,
  IAppointment
>(
  AppointmentActionEnums.updateAppointmentSuccess,
  (appointment: IAppointment) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    appointment,
  })
);

//Update appointment  by id Failed
export const updateAppointmentError = createAction<IAppointmentStateContext>(
  AppointmentActionEnums.updateAppointmentError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Delete Appointment Actions
//Delete  Appointment Pending
export const deleteAppointmentPending = createAction<IAppointmentStateContext>(
  AppointmentActionEnums.deleteAppointmentPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

//Delete  Appointment Success
export const deleteAppointmenttSuccess = createAction<
  IAppointmentStateContext,
  IAppointment
>(
  AppointmentActionEnums.deleteAppointmenttSuccess,
  (appointment: IAppointment) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    appointment,
  })
);

//Update appointment  by id Failed
export const deleteAppointmentError = createAction<IAppointmentStateContext>(
  AppointmentActionEnums.deleteAppointmentError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
