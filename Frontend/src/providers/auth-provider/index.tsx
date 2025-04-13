"use client";
import { getAxiosInstace } from "../../utils/axiosInstance";
import { IAuth, ILoginResquest } from "./models";
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const instance = getAxiosInstace();


  const signUp = async (Auth: IAuth): Promise<void> => {
    dispatch(signUpPending());
    const endpoint =
      Auth.role == "PATIENT" ? `register/Patient` : `resigter:Provider`;
    await instance
      .post<IAuth>(endpoint, Auth)
      .then((response) => {
        dispatch(signUpSuccess(response.data));
        console.log("Signup was successfull");
      })
      .catch((error) => {
        console.error(error);
        console.log("Sign up was unsuccessfull");
      });
  };
  const signIn = async (LoginResquest: ILoginResquest): Promise<void> => {
    dispatch(signInPending());
    const endpoint = "Auths/login";
    await instance
      .post(endpoint, LoginResquest)
      .then((response) => {
        // console.log("Response", response.data);
        const token = response.data.token;
        if (token) {
          console.log("session This where token is stored");
          sessionStorage.setItem("jwt", token);
        }
        dispatch(signInSuccess(response.data));
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(
          "Error during login:",
          error.response?.data?.message || error
        );
        dispatch(signInError());
        throw error;
      })
      .finally(() => {
        //isPending=false
        console.log("Done trying to process your signIn request");
      });
  };
  const signOut = () => {
    dispatch(signInPending());
    sessionStorage.removeItem("jwt"); 
    if(sessionStorage.length===0){
        dispatch(signOutSuccess());
        console.log("The session Storage empty")
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
