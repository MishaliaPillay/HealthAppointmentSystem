"use client";
import React, { useReducer, useContext } from "react";
import {
  ProviderAvailabilityStateContext,
  ProviderAvailabilityActionContext,
  INITIAL_STATE,
  IProvidersAvailability,
} from "./context";
import { ProviderAvailabilityReducer } from "./reducer";
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
import axios from "axios";

export const ProviderAvailabilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    ProviderAvailabilityReducer,
    INITIAL_STATE
  );

  const fetchAvailabilityByProvider = async (providerId: string) => {
    dispatch(fetchAvailabilityPending());
    try {
      const response = await axios.get(
        `/api/services/app/ProviderAvailability/GetAvailabilityByProviderId?providerId=${providerId}`
      );
      dispatch(fetchAvailabilitySuccess({ result: response.data.result }));
    } catch (error) {
      console.error("Error fetching provider availability:", error);
      dispatch(fetchAvailabilityError());
    }
  };

  const createAvailability = async (data: IProvidersAvailability) => {
    dispatch(createAvailabilityPending());
    try {
      await axios.post(
        "https://localhost:44311/api/services/app/ProviderAvailability/CreateAvailability",
        data
      );
      dispatch(createAvailabilitySuccess());
    } catch (error) {
      console.error("Error creating provider availability:", error);
      dispatch(createAvailabilityError());
    }
  };

  const updateAvailability = async (data: IProvidersAvailability) => {
    dispatch(updateAvailabilityPending());
    try {
      await axios.put(
        "/api/services/app/ProviderAvailability/UpdateAvailability",
        data
      );
      dispatch(updateAvailabilitySuccess());
    } catch (error) {
      console.error("Error updating provider availability:", error);
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

export const useAvailabilityState = () => {
  const context = useContext(ProviderAvailabilityStateContext);
  if (!context) {
    throw new Error(
      "useAvailabilityState must be used within a ProviderAvailabilityProvider"
    );
  }
  return context;
};

export const useAvailabilityActions = () => {
  const context = useContext(ProviderAvailabilityActionContext);
  if (!context) {
    throw new Error(
      "useAvailabilityActions must be used within a ProviderAvailabilityProvider"
    );
  }
  return context;
};
