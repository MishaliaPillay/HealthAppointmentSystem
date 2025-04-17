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
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(CheckUserReducer, INITIAL_STATE);
  //const instance = getAxiosInstace();
  const signUp = async (Auth: IAuth): Promise<void> => {
    dispatch(signUpPending());

    const endpoint =
      Auth.role == "PATIENT"
        ? `https://localhost:44311/api/services/app/Patient/Create`
        : `https://localhost:44311/api/services/app/Provider/Create`;
    await axios
      .post<IAuth>(endpoint, Auth)
      .then((response) => {
        console.log("ndnsc");
        dispatch(signUpSuccess(response.data));
        console.log();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const signIn = async (
    SignInRequest: ISignInRequest
  ): Promise<ISignInResponse> => {
    dispatch(signInPending());
    const endpoint = "https://localhost:44311/api/TokenAuth/Authenticate";
    return axios
      .post(endpoint, SignInRequest)
      .then((response) => {
        const token = response.data.result.accessToken;
        if (token) {
          sessionStorage.setItem("jwt", token);
          dispatch(signInSuccess(token));
          return token;
        } else {
          throw new Error("There is no response");
        }
      })
      .catch((error) => {
        console.error(
          "Error during signIn:",
          error.response?.data?.message || error
        );
        dispatch(signInError());
        throw error;
      });
  };
  const signOut = () => {
    dispatch(signInPending());
    sessionStorage.removeItem("jwt");
    if (sessionStorage.length === 0) {
      dispatch(signOutSuccess());
    }
    dispatch(signInError);
  };
  const userExists = async (UserCheck: IUserCheck): Promise<IUserExists> => {
    dispatch(userCheckPending());

    const endpoint =
      "https://localhost:44311/api/services/app/User/CheckUserExists";
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
      <CheckUserActionContext.Provider
        value={{ signIn, signUp, signOut, userExists }}
      >
        {children}
      </CheckUserActionContext.Provider>
    </CheckUserStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(CheckUserStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

export const useAuthActions = () => {
  const context = useContext(CheckUserActionContext);
  if (!context) {
    throw new Error("useAuthActions must be used within a AuthProvider");
  }
  return context;
};
