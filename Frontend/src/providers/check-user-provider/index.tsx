"use client";
//import { getAxiosInstace } from "../../utils/axiosInstance";
import { IUserCheck, IUserExists } from "./models";
import {
  INITIAL_STATE,
  CheckUserActionContext,
  CheckUserStateContext,
} from "./context";
import { CheckUserReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { userCheckError, userCheckPending, userCheckSuccess } from "./actions";
import axios from "axios";
export const CheckUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(CheckUserReducer, INITIAL_STATE);

  const userExists = async (UserCheck: IUserCheck): Promise<IUserExists> => {
    dispatch(userCheckPending());

    const endpoint =
      "https://healthappointmentsystem-2.onrender.com/api/services/app/User/CheckUserExists";
    return axios
      .post<IUserExists>(endpoint, UserCheck)
      .then((response) => {
        dispatch(userCheckSuccess());
        return response.data;
      })
      .catch((error) => {
        console.error("Error during userExists check:", error);
        dispatch(userCheckError());
        throw error;
      });
  };

  return (
    <CheckUserStateContext.Provider value={state}>
      <CheckUserActionContext.Provider value={{ userExists }}>
        {children}
      </CheckUserActionContext.Provider>
    </CheckUserStateContext.Provider>
  );
};

export const useCheckuserState = () => {
  const context = useContext(CheckUserStateContext);
  if (!context) {
    throw new Error(
      "useCheckuserState must be used within a CheckUserProvider"
    );
  }
  return context;
};

export const useCheckuserActions = () => {
  const context = useContext(CheckUserActionContext);
  if (!context) {
    throw new Error(
      "useCheckuserActions must be used within a CheckUserProvider"
    );
  }
  return context;
};
