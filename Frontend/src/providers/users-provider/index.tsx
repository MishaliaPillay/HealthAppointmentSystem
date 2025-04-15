"use client";
import { getAxiosInstace } from "../../utils/axiosInstance";
import { IUser } from "./models";
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

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

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
    const endpoint = `updateuser/${id}`;
    await instance
      .post(endpoint, id)
      .then((response) => {
        dispatch(getUserSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(getUserError(error));
        console.error(error);
      });
  };

  // Create a new User

  //getCurrentUser
  const getCurrentUser = async () => {
    dispatch(getCurrentUserPending());
    const endpoint = `user/current`;
    const token = sessionStorage.getItem("jwt")?.trim();
    await instance
      .get(endpoint, { headers: { Authorization: `${token}` } })
      .then((response) => {
        console.log("gettingusers");
        //dispatch(getCurrentUser(response.data.data));
        console.log("get currnet user response"+response.data.data);
        dispatch(getCurrentUserSuccess());
      })
      .catch((error) => {
        console.error(error);
        dispatch(getCurrentUserError());
        return null; // Return null instead of nothing
      })
      .finally(() => {
        //isPending=false
        console.log("Done trying to process your getUser request");
      });
  };

  return (
    <UserStateContext.Provider value={state}>
      <UserActionContext.Provider
        value={{
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
