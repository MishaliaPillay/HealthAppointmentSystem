"use client";

import { useContext, useReducer } from "react";
import { getAxiosInstace } from "@/utils/axiosInstance";
import { ProviderAvailabilityReducer } from "./reducer";
import {
  INITIAL_STATE,
  IProvidersAvailability,
ProviderAvailabilityStateContext,
  ProviderAvailabilityActionContext,
} from "./context";

import {
  fetchAvailabilityPending,
  fetchAvailabilitySuccess,
  fetchAvailabilityError,
  createAvailabilityPending,
  createAvailabilitySuccess,
  createAvailabilityError,
  updateAvailabilityPending,
  updateAvailabilitySuccess,
  updateAvailabilityError,
} from "./actions";

export const ProviderAvailabilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    ProviderAvailabilityReducer,
    INITIAL_STATE
  );
  const instance = getAxiosInstace();

  const fetchAvailabilityByProvider = async (providerId: string) => {
    dispatch(fetchAvailabilityPending());
    const endpoint = `/api/services/app/ProviderAvailability/GetAvailabilityByProviderId?providerId=${providerId}`;

    try {
      const response = await instance.get(endpoint);
      dispatch(fetchAvailabilitySuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchAvailabilityError());
    }
  };

  const createAvailability = async (data: IProvidersAvailability) => {
    dispatch(createAvailabilityPending());
    const endpoint = `/api/services/app/ProviderAvailability/CreateAvailability`;

    try {
      await instance.post(endpoint, data);
      dispatch(createAvailabilitySuccess());
      fetchAvailabilityByProvider(data.providerId);
    } catch (error) {
      console.error(error);
      dispatch(createAvailabilityError());
    }
  };

  const updateAvailability = async (data: IProvidersAvailability) => {
    dispatch(updateAvailabilityPending());
    const endpoint = `/api/services/app/ProviderAvailability/UpdateAvailability`;

    try {
      await instance.put(endpoint, data);
      dispatch(updateAvailabilitySuccess());
      fetchAvailabilityByProvider(data.providerId);
    } catch (error) {
      console.error(error);
      dispatch(updateAvailabilityError());
    }
  };

  return (
    <ProviderAvailabilityStateContext.Provider value={state}>
      <ProviderAvailabilityActionContext.Provider
        value={{
          fetchAvailabilityByProvider,
          createAvailability,
          updateAvailability,
        }}
      >
        {children}
      </ProviderAvailabilityActionContext.Provider>
    </ProviderAvailabilityStateContext.Provider>
  );
};

export const useProviderAvailabilityState = () => {
  const context = useContext(ProviderAvailabilityStateContext);
  if (!context) {
    throw new Error(
      "useProviderAvailabilityState must be used within a ProviderAvailabilityProvider"
    );
  }
  return context;
};

export const useProviderAvailabilityActions = () => {
  const context = useContext(ProviderAvailabilityActionContext);
  if (!context) {
    throw new Error(
      "useProviderAvailabilityActions must be used within a ProviderAvailabilityProvider"
    );
  }
  return context;
};