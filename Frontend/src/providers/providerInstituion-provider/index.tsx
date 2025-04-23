"use client";
import { getAxiosInstace } from "@/utils/axiosInstance";
import { useContext, useReducer } from "react";
import { ProviderInReducer } from "./reducer";
import {
  INITIAL_STATE,
  ProvidersInActionContext,
  ProvidersInStateContext,
} from "./context";
import {
  getProvidersInInstitutionError,
  getProvidersInInstitutionPending,
  getProvidersInInstitutionSuccess,
} from "./actions";

export const ProvidersInstituionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ProviderInReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  //Get Providers in Intitution by the id
  const getProviderInInstitution = async (institutionId: number) => {
    dispatch(getProvidersInInstitutionPending());
    const endpoint = `/api/services/ProviderInstution/GetProvidersInInstitution?institutionId=${institutionId}`;

    await instance
      .get(endpoint)
      .then((response) => {
   
        dispatch(getProvidersInInstitutionSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getProvidersInInstitutionError());
      });
  };

  return (
    <ProvidersInStateContext.Provider value={state}>
      <ProvidersInActionContext.Provider
        value={{
          getProviderInInstitution,
        }}
      >
        {children}
      </ProvidersInActionContext.Provider>
    </ProvidersInStateContext.Provider>
  );
};

export const useProvidersInstitionState = () => {
  const context = useContext(ProvidersInStateContext);
  if (!context) {
    throw new Error(
      "ProvidersInActionContext must be used within a ProvidersInstituionProvider"
    );
  }
  return context;
};

export const useProvidersInstitionActions = () => {
  const context = useContext(ProvidersInActionContext);
  if (!context) {
    throw new Error(
      "ProvidersInActionContext must be used within a ProvidersInstituionProvider"
    );
  }
  return context;
};
