"use client";
import { getAxiosInstace } from "../../utils/axiosInstance";
import { IPatient, IUser } from "./models";
import { INITIAL_STATE, UserActionContext, UserStateContext } from "./context";
import { UserReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getUserError,
  getUserPending,
  getUserSuccess,
  getCurrentUserPending,
  getCurrentUserSuccess,
  getCurrentUserError,
  getCurrentPatientPending,
  getCurrentPatientSuccess,
  getCurrentPatientError,
  createUserSuccess,
  createUserError,
  createUserPending,
  updateUserPending,
  updateUserSuccess,
  updateUserError,
  deleteUserSuccess,
  deleteUserError,
  deleteUserPending,
} from "./actions";
import axios from "axios";
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  //getCurrentUser
  const getCurrentUser = (token: string): Promise<IUser | null> => {
    dispatch(getCurrentUserPending());
    const endpoint =
      "https://localhost:44311/api/services/app/Session/GetCurrentLoginInformations";
    console.log("Trying to get the current user");
    return axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      })
      .then((response) => {
        if (response) {
          console.log(
            "this is the response from get current user",
            response.data.result.user
          );
          dispatch(getCurrentUserSuccess(response.data.result.user));
          return response.data.result.user;
        } else {
          console.warn("No user data found in response");
          dispatch(getCurrentUserError());
          return null;
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        dispatch(getCurrentUserError());
        return null;
      })
      .finally(() => {
        console.log("Done trying to process your getUser request");
      });
  };
  const getCurrentPatient = (userId: number): Promise<IPatient | null> => {
    dispatch(getCurrentPatientPending());
    const endpoint = `https://localhost:44311/api/services/app/Patient/GetCurrentPatient?input=${userId}`;
    console.log("Trying to get the current user");
    return axios
      .get(endpoint)
      .then((response) => {
        if (response) {
          console.log(
            "this is the response from get current user",
            response.data.result.user
          );
          dispatch(getCurrentPatientSuccess(response.data.result.user));
          return response.data.result.user;
        } else {
          console.warn("No user data found in response");
          dispatch(getCurrentPatientError());
          return null;
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        dispatch(getCurrentUserError());
        return null;
      })
      .finally(() => {
        console.log("Done trying to process your getUser request");
      });
  };
  return (
    <UserStateContext.Provider value={state}>
      <UserActionContext.Provider
        value={{
          getCurrentPatient,
          getUsers,
          createUser,
          updateUser,
          deleteUser,
          getCurrentUser,
          getUser,
        }}
      >
        {children}
      </UserActionContext.Provider>
    </UserStateContext.Provider>
  );
  // Fetch all Users
  const getUsers = async () => {
    dispatch(getUserPending);
    const endpoint = `getusersAll`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getUserSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(getUserError(error));
        console.error(error);
      });
  };
  // create User
  const createUser = async (user: IUser) => {
    dispatch(createUserPending());
    const endpoint = `createuser/user`;
    await instance
      .post(endpoint, user)
      .then((response) => {
        dispatch(createUserSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(createUserError(error));
        console.error(error);
      });
  };
  // Update existing User
  const updateUser = async (user: IUser) => {
    dispatch(updateUserPending());
    const endpoint = `updateuser/user`;
    await instance
      .post(endpoint, user)
      .then((response) => {
        dispatch(updateUserSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(updateUserError(error));
        console.error(error);
      });
  };
  //Delete user
  const deleteUser = async (id: string) => {
    dispatch(deleteUserPending());
    const endpoint = `updateuser/user`;
    await instance
      .post(endpoint, id)
      .then((response) => {
        dispatch(deleteUserSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(deleteUserError(error));
        console.error(error);
      });
  };
  //getUser
  const getUser = async (id: string) => {
    dispatch(getUserPending());
    const endpoint = `https://localhost:44311/api/services/app/Patient/GetCurrentPatient?input=${id}`;
    await axios
      .get(endpoint)
      .then((response) => {
        dispatch(getUserSuccess(response.data));
        console.log("Fetched user by get user by Id" + response.data);
      })
      .catch((error) => {
        dispatch(getUserError(error));
        console.error(error);
      });
  };
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
