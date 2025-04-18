"use client";
//import { getAxiosInstace } from "../../utils/axiosInstance";
import { IAuth, ISignInResponse, ISignInRequest } from "./models";
import { INITIAL_STATE, AuthActionContext, AuthStateContext } from "./context";
import { AuthReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  signInError,
  signInPending,
  signInSuccess,
  signOutSuccess,
  
  signUpPending,
  signUpSuccess,
} from "./actions";
import axios from "axios";
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
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

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionContext.Provider value={{ signIn, signUp, signOut }}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

export const useAuthActions = () => {
  const context = useContext(AuthActionContext);
  if (!context) {
    throw new Error("useAuthActions must be used within a AuthProvider");
  }
  return context;
};
