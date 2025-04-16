"use client"
import { getAxiosInstace } from "../../app/utils/axiosInstance";
import { IProvider } from "./models";
import {
  INITIAL_STATE,
  ProviderActionContext,
  ProviderStateContext,
} from "./context";
import { ProviderReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  registerProviderPending,
  registerProviderError,
  registerProviderSuccess,
  getProviderPending,
  getProvidersPending,
  getProvidersSuccess,
  getProvidersError,
  getProviderError,
  updateProviderPending,
  updateProviderSuccess,
  updateProviderError,
  deleteProviderPending,
  deleteProviderSuccess,
} from "./actions";

export const ProviderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ProviderReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  //Register the Provider
  const registerProvider = async (Provider: IProvider) => {
    dispatch(registerProviderPending());
    const endpoint = `/register`;
    await instance
      .post(endpoint, Provider)
      .then((response) => {
        dispatch(registerProviderSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(registerProviderError());
      })
  };

  //Get All Providers
  const getProviders = async () => {
    dispatch(getProvidersPending());
    const endpoint = `providers`;
    await instance
      .post(endpoint)
      .then((response) => {
        dispatch(getProvidersSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getProvidersError());
      })
  };

  //Get Provider
  const getProvider = async (ProviderId: string) => {
    dispatch(getProviderPending());
    const endpoint = `Provider`;
    await instance
      .post(endpoint, ProviderId)
      .then((response) => {
        dispatch(getProvidersSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getProviderError());
      })
  };

  //Update Provider
  const updateProvider = async (Provider: IProvider) => {
    dispatch(updateProviderPending());
    const endpoint = `updateProvider`;
    await instance
      .post(endpoint, Provider)
      .then((response) => {
        dispatch(updateProviderSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateProviderError());
      })
  };

  //Delete Provider
  const deleteProviderbyId = async (ProviderId: string) => {
    dispatch(deleteProviderPending());
    const endpoint = `${ProviderId}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteProviderSuccess(response.data));
      })
      .catch((error) => {
        dispatch(deleteProviderSuccess(error.data));
      })
  };

  return (
    <ProviderStateContext.Provider value={state}>
      <ProviderActionContext.Provider
        value={{
          registerProvider,
          getProviders,
          getProvider,
          updateProvider,
          deleteProviderbyId,
        }}
      >
        {children}
      </ProviderActionContext.Provider>
    </ProviderStateContext.Provider>
  );
};
export const useProviderState = () => {
  const context = useContext(ProviderStateContext);
  if (!context) {
    throw new Error("useProviderState must be used within a ProviderProvider");
  }
  return context;
};

export const useProviderActions = () => {
  const context = useContext(ProviderActionContext);
  if (!context) {
    throw new Error(
      "ProviderActionContext must be used within a ProviderProvider"
    );
  }
  return context;
};
