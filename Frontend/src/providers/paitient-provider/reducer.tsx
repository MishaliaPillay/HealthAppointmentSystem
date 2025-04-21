import { handleActions } from "redux-actions";
import { INITIAL_STATE, IPatientStateContext } from "./context";
import { PatientActionEnums } from "./actions";

export const PatientReducer = handleActions<
  IPatientStateContext,
  IPatientStateContext
>(
  {
    [PatientActionEnums.getCurrentPatientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.getCurrentPatientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.getCurrentPatientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.getPatientsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.getPatientsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.getPatientsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.getPatientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.getPatientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.getPatientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.registerPatientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.registerPatientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.registerPatientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.updatePatientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.updatePatientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.updatePatientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.deletePatientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.deletePatientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PatientActionEnums.deletePatientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
