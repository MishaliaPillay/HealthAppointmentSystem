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
  getProvidersPending,
  getProvidersSuccess,
  getProvidersError,
  getProviderPending,
  getProviderSuccess,
  getProviderError,
  updateProviderPending,
  updateProviderSuccess,
  updateProviderError,
  deleteProviderPending,
  deleteProviderSuccess,
  deleteProviderError,
} from "./actions";
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
    const endpoint = `/api/services/Provider/GetCurrentProvider?userId=${userId}`;
    return instance
      .get(endpoint)
      .then((response) => {
        if (response.data?.result) {
          dispatch(getCurrentProviderSuccess(response.data.result));
          return response.data.result;
        } else {
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

  // Register Provider
  const registerProvider = async (provider: IProviderRegisteration) => {
    dispatch(registerProviderPending());
    const endpoint = `/api/services/Provider/Create`;

    return instance
      .post(endpoint, provider)
      .then((response) => {
        dispatch(registerProviderSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        console.error("Error registering provider:", error);
        dispatch(registerProviderError());
      });
  };

  // Get All Providers
  const getProviders = async (): Promise<IProvider[]> => {
    dispatch(getProvidersPending());
    return instance
      .get("/api/services/Provider/GetAll")
      .then((response) => {
        dispatch(getProvidersSuccess(response.data.result));
        return response.data.result; // Ensure it returns an array of providers
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
        dispatch(getProvidersError());
        return [];
      });
  };

  // Get Provider by ID
  const getProvider = async (providerId: string): Promise<IProvider | null> => {
    dispatch(getProviderPending());
    return instance
      .get(`/api/services/Provider/Get?Id=${providerId}`)
      .then((response) => {
        dispatch(getProviderSuccess(response.data.result));
        return response.data.result; // Ensure it returns provider data
      })
      .catch((error) => {
        console.error("Error fetching provider by ID:", error);
        dispatch(getProviderError());
        return null;
      });
  };
  // Update Provider
  const updateProvider = async (
    providerId: string,
    providerData: UpdateProvider
  ) => {
    dispatch(updateProviderPending());
    const endpoint = `/api/services/Provider/UpdateProvider`;
    const payload = { ...providerData, id: providerId };

    return instance
      .put(endpoint, payload)
      .then((response) => {
        dispatch(updateProviderSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        console.error("Update error:", error.response?.data || error.message);
        dispatch(updateProviderError());
      });
  };

  // Delete Provider
  const deleteProviderById = async (providerId: string) => {
    dispatch(deleteProviderPending());
    const endpoint = `/api/services/Provider/Delete?ProviderId=${providerId}`;

    return instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteProviderSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        console.error("Error deleting provider:", error);
        dispatch(deleteProviderError());
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
          deleteProviderById,
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
      "useProviderActions must be used within a ProviderProvider"
    );
  }
  return context;
};
