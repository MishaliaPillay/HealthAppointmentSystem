"use client";
import { getAxiosInstace } from "../../utils/axiosInstance";
import { IAuth, ILoginResquest } from "./models";
import { INITIAL_STATE, AuthActionContext, AuthStateContext } from "./context";
import { AuthReducer } from "./reducer";
import { useContext, useReducer, useState } from "react";
import {
  signInError,
  signInPending,
  signInSuccess,
  signOutSuccess,
  signUpPending,
  signUpSuccess,
} from "./actions";
import {mockAuthService} from "../../utils/mockApiService"
import axios from "axios";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const instance = getAxiosInstace();
  const [Loading, setLoading] = useState(false);

  const signUp = async (Auth: IAuth): Promise<void> => {
    dispatch(signUpPending());
    const endpoint =
      Auth.role == "PATIENT" ? `/Patient/Create` : `/Provider/Create`;
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
    const endpoint = "https://localhost:44311/api/TokenAuth/Authenticate";
    await axios.post(endpoint, LoginResquest)
      .then((response) => {
        // console.log("Response", response.data);
        console.log("This is the token:"+response.data)
        const token = response.data.token;
        if (token) {
          console.log("session This where token is stored");
          sessionStorage.setItem("jwt", token);
        }
        dispatch(signInSuccess(response.data));
        console.log("this is the token"+response.data);
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
        setLoading(false)
        console.log("Done trying to process your signIn request");
      });
  };
//   const signIn = async (LoginResquest: ILoginResquest): Promise<void> => {
//     dispatch(signInPending());
//     const endpoint = "";
//     await instance
//       .post(endpoint, LoginResquest)
//       .then((response) => {
//         // console.log("Response", response.data);
//         const token = response.data.token;
//         if (token) {
//           console.log("session This where token is stored");
//           sessionStorage.setItem("jwt", token);
//         }
//         dispatch(signInSuccess(response.data));
//         console.log(response.data);
//         return response.data;
//       })
//       .catch((error) => {
//         console.error(
//           "Error during login:",
//           error.response?.data?.message || error
//         );
//         dispatch(signInError());
//         throw error;
//       })
//       .finally(() => {
//         setLoading(false)
//         console.log("Done trying to process your signIn request");
//       });
//   };
// const signIn = async (LoginRequest: ILoginResquest): Promise<void> => {
//     dispatch(signInPending());
//     try {
//       const response = await mockAuthService.signIn(LoginRequest);
//       const token = response.data.token;
//       if (token) {
//         sessionStorage.setItem("jwt", token);
//         console.log("Token stored in sessionStorage:", token);
//       }
//       setLoading(false)
//       dispatch(signInSuccess(response.data));
//     } catch (error) {
//       console.error("Sign-in error:", error.message);
//       dispatch(signInError());
      
//     }
//   };

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
