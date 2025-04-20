"use client";
import { getAxiosInstace } from "../../app/utils/axiosInstance";
import { IProvider, IProviderRegisteration } from "./models";
import {
  INITIAL_STATE,
  ProviderActionContext,
  ProviderStateContext,
} from "./context";
import { ProviderReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getCurrentProviderPending,
  getCurrentProviderSuccess,
  getCurrentProviderError,
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
import axios from "axios";
import { UpdateProvider } from "../providerMedicPrac-provider/models";
export const ProviderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ProviderReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  // Get current Provider
  const getCurrentProvider = async (
    userId: number
  ): Promise<IProvider | null> => {
    dispatch(getCurrentProviderPending());
    const endpoint = `https://localhost:44311/api/services/app/Provider/GetCurrentProvider?userId=${userId}`;
    return axios
      .get(endpoint)
      .then((response) => {
        if (response?.data?.result) {
          dispatch(getCurrentProviderSuccess(response.data.result));
          return response.data.result;
        } else {
          console.warn("No Provider data found in response");
          dispatch(getCurrentProviderError());
          return null;
        }
      })
      .catch((error) => {
        console.error("Error fetching current Provider:", error);
        dispatch(getCurrentProviderError());
        return null;
      });
  };

  //Register the Provider
  const registerProvider = async (Provider: IProviderRegisteration) => {
    dispatch(registerProviderPending());
    const endpoint = `/Patient/Create`;
    https: await instance
      .post(endpoint, Provider)
      .then((response) => {
        dispatch(registerProviderSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(registerProviderError());
      });
  };

  //Get All Providers
  const getProviders = async () => {
    dispatch(getProvidersPending());
    const endpoint = `/Patient/GetAll`;
    https: await instance
      .post(endpoint)
      .then((response) => {
        dispatch(getProvidersSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getProvidersError());
      });
  };

  //Get Provider
  const getProvider = async (ProviderId: string) => {
    dispatch(getProviderPending());
    const endpoint = `/Patient/Get`;
    await instance
      .post(endpoint, ProviderId)
      .then((response) => {
        dispatch(getProvidersSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getProviderError());
      });
  };

  //Update Provider
  const updateProvider = async (
    ProviderId: string,
    ProviderData: UpdateProvider
  ) => {
    dispatch(updateProviderPending());
    const payload = {
      ...ProviderData,
      id: ProviderId,
    };
    const endpoint = `/Provider/UpdateProvider`;
    await instance
      .put(endpoint, payload)
      .then((response) => {
        dispatch(updateProviderSuccess(response.data));
      })
      .catch((error) => {
        console.error("Update error:", error.response?.data || error.message);
        dispatch(updateProviderError());
      });
  };

  //Delete Provider
  const deleteProviderbyId = async (ProviderId: string) => {
    dispatch(deleteProviderPending());
    const endpoint = `/Patient/Delete?ProviderId=${ProviderId}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteProviderSuccess(response.data));
      })
      .catch((error) => {
        dispatch(deleteProviderSuccess(error.data || "An error occurrred"));
      });
  };

  return (
    <ProviderStateContext.Provider value={state}>
      <ProviderActionContext.Provider
        value={{
          getCurrentProvider,
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
