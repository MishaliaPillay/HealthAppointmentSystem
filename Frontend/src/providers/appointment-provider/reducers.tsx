"use client";
import { handleActions } from "redux-actions";
import { IAppointmentStateContext, INITIAL_STATE } from "./context";
import { AppointmentActionEnums } from "./actions";

export const AppointmentReducer = handleActions<
  IAppointmentStateContext,
  IAppointmentStateContext
>(
  {
    //Booking an Appointment
    [AppointmentActionEnums.bookAppointmentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AppointmentActionEnums.bookAppointmentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AppointmentActionEnums.bookAppointmentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //Get all Appointments
    [AppointmentActionEnums.getAllAppointmentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AppointmentActionEnums.getAllAppointmentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AppointmentActionEnums.getAllAppointmentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //Get an Appointment by the id
    [AppointmentActionEnums.getAppointmentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AppointmentActionEnums.getAppointmentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AppointmentActionEnums.getAppointmentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //update an Appointment
    [AppointmentActionEnums.updateAppointmentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AppointmentActionEnums.updateAppointmentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AppointmentActionEnums.updateAppointmentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //delete an Appointment
    [AppointmentActionEnums.deleteAppointmentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AppointmentActionEnums.deleteAppointmenttSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AppointmentActionEnums.deleteAppointmentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
