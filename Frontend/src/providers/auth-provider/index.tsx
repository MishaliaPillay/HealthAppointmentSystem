"use client";
import { getAxiosInstace } from "@/utils/axios-instance";
import { IUser, ILoginResponse, ILoginResquest } from "./models";
import { INITIAL_STATE, UserActionContext, UserStateContext } from "./context";
import { UserReducer } from "./reducer";
import {useContext, useReducer } from "react";
import {
  getUserError,
  getUserPending,
  getUserSuccess,
  signInError,
  signInPending,
  signInSuccess,
  //   verifyUserPending,
  //   verifyUserError,
  //   verifyUserSuccess,
} from "./actions";
import axios from "axios";
import { error } from "console";
import { isPending } from "@reduxjs/toolkit";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getUser = async () => {
    dispatch(getUserPending());
    const endpoint = `user/current`;
    const token = sessionStorage.getItem("jwt")?.trim();
    await instance
      .get(endpoint, { headers: { Authorization: `${token}` } })
      .then((response) => {
        console.log("gettingusers");
        dispatch(getUserSuccess(response.data.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getUserError());
        return null; // Return null instead of nothing
      })
      .finally(() => {
        //isPending=false
        console.log("Done trying to process your getUser request");
      });
  };

  const signIn = async (LoginResquest:ILoginResquest) => {
    dispatch(signInPending());
    const endpoint = "users/login";
    await instance
      .post<ILoginResponse>(endpoint,LoginResquest)
      .then((response) => {
        // console.log("Response", response.data);
        const token = response.data.token;
        console.log("session This where token stored");
        sessionStorage.setItem("jwt", token);
        dispatch(signInSuccess(response.data));
        console.log(response);
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

  return (
    <UserStateContext.Provider value={state}>
      <UserActionContext.Provider value={{getUser,signIn}}>
        {children}
      </UserActionContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};

export const useUserActions = () => {
  const context = useContext(UserActionContext);
  if (!context) {
    throw new Error("useUserActions must be used within a UserProvider");
  }
  return context;
};
