"use client";
//import { getAxiosInstace } from "../../utils/axiosInstance";
import { IAuth, ISignInResponse, ISignInResquest } from "./models";
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
import { getRole } from "@/utils/decoder";
import { useRouter } from "next/navigation";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const router = useRouter();
console.log('state', state)
  //const instance = getAxiosInstace();
  const signUp = async (Auth: IAuth): Promise<void> => {
    dispatch(signUpPending());
    debugger
    const endpoint =
      Auth.role == "PATIENT" ? `https://localhost:44311/api/services/app/Patient/Create` : `https://localhost:44311/api/services/app/Provider/Create`;
      console.log("Here is the role"+Auth.role)
      debugger
    await axios
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
  // const signUp = async (Auth: IAuth): Promise<void> => {
  //   dispatch(signUpPending());
  //   debugger
  //   const endpoint =
  //     Auth.role == "PATIENT" ? `/Patient/Create` : `/Provider/Create`;
  //     console.log("Here is the role"+Auth.role)
  //     debugger
  //   await instance
  //     .post<IAuth>(endpoint, Auth)
  //     .then((response) => {
  //       dispatch(signUpSuccess(response.data));
  //       console.log("Signup was successfull");
  //     })
  //     .catch((error) => {
  //       debugger
  //       console.error(error);
  //       console.log("Sign up was unsuccessfull");
  //     });
  // };
  const signIn = async (SignInResquest: ISignInResquest): Promise<ISignInResponse> => {
    dispatch(signInPending());
    //debugger;
    const endpoint = "https://localhost:44311/api/TokenAuth/Authenticate";
    return axios
      .post(endpoint, SignInResquest)
      .then((response) => {
        // console.log("Response", response.data);
        const role =getRole(response.data.result)
        if (role === "provider") {
          router.push("/provider-dashboard");
        } else if (role=== "patient") {
          router.push("/patient-dashboard");
        } else {
          router.push("/");
        }
        console.log("This is the token:" + response.data.result.accessToken,"and role",role);
        const token = response.data.result.accessToken;
        if (token) {
          console.log("session This where token is stored"+token);
          sessionStorage.setItem("jwt", token);
          dispatch(signInSuccess(token));
          console.log('SignUp success',token)
          return token;
        }else{
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
      })
      .finally(() => {
        console.log("Done trying to process your signIn request");
      });
  };
  const signOut = () => {
    dispatch(signInPending());
    sessionStorage.removeItem("jwt");
    if (sessionStorage.length === 0) {
      dispatch(signOutSuccess());
      console.log("The session Storage empty");
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
