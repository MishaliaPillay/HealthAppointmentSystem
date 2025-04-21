"use client";
import { IProvider } from "./models";
import { IProviderStateContext } from "./context";
import { createAction } from "redux-actions";

export enum ProviderActionEnums {
  getProvidersPending = "GET_PROVIDERS_PENDING",
  getProvidersSuccess = "GET_PROVIDERS_SUCCESS",
  getProvidersError = "GET_PROVIDERS_ERROR",
  getCurrentProviderPending = "GET_CURRENTPROVIDER_PENDING",
  getCurrentProviderSuccess = "GET_CURRENTPROVIDER_SUCCESS",
  getCurrentProviderError = "GET_CURRENTPROVIDER_ERROR",

  getProviderPending = "GET_PROVIDER_PENDING",
  getProviderSuccess = "GET_PPROVIDER_SUCCESS",
  getProviderError = "GET_PROVIDER_ERROR",

  registerProviderPending = "CREATE_PROVIDER_PENDING",
  registerProviderSuccess = "CREATE_Provider_SUCCESS",
  registerProviderError = "CREATE_PROVIDER_ERROR",

  updateProviderPending = "UPDATE_=PROVIDER_PENDING",
  updateProviderSuccess = "UPDATE_=PROVIDER_SUCCESS",
  updateProviderError = "UPDATE_=PROVIDER_ERROR",

  deleteProviderPending = "DELETE_PROVIDER_PENDING",
  deleteProviderSuccess = "DELETE_PROVIDER_SUCCESS",
  deleteProviderError = "DELETE_PROVIDER_ERROR",
}

//Get All Paitients
//Multiple Paitients
export const getProvidersPending = createAction<IProviderStateContext>(
  ProviderActionEnums.getProvidersPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const getProvidersSuccess = createAction<
  IProviderStateContext,
  IProvider[]
>(ProviderActionEnums.getProvidersSuccess, (Providers: IProvider[]) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Providers,
}));

// Get Current Provider actions
export const getCurrentProviderPending = createAction<IProviderStateContext>(
  ProviderActionEnums.getCurrentProviderPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getCurrentProviderSuccess = createAction<
  IProviderStateContext,
  IProvider
>(
  ProviderActionEnums.getCurrentProviderSuccess, // Fixed incorrect enum
  (currentProvider: IProvider) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    currentProvider,
  })
);

export const getCurrentProviderError = createAction<IProviderStateContext>(
  ProviderActionEnums.getCurrentProviderError, // Fixed incorrect enum
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getProvidersError = createAction<IProviderStateContext>(
  ProviderActionEnums.getProvidersError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Get Single Provider
export const getProviderError = createAction<IProviderStateContext>(
  ProviderActionEnums.getProvidersError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getProviderPending = createAction<IProviderStateContext>(
  ProviderActionEnums.getProviderPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getProviderSuccess = createAction<IProviderStateContext, IProvider>(
  ProviderActionEnums.getProviderSuccess,
  (Provider: IProvider) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Provider,
  })
);

//Registering The Provider
export const registerProviderPending = createAction<IProviderStateContext>(
  ProviderActionEnums.registerProviderPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const registerProviderSuccess = createAction<
  IProviderStateContext,
  IProvider
>(ProviderActionEnums.registerProviderSuccess, (Provider: IProvider) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Provider,
}));

export const registerProviderError = createAction<IProviderStateContext>(
  ProviderActionEnums.registerProviderError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Update The Provider
export const updateProviderPending = createAction<IProviderStateContext>(
  ProviderActionEnums.updateProviderPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateProviderSuccess = createAction<
  IProviderStateContext,
  IProvider
>(ProviderActionEnums.updateProviderSuccess, (Provider: IProvider) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Provider,
}));

export const updateProviderError = createAction<IProviderStateContext>(
  ProviderActionEnums.updateProviderError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Delete Provider
export const deleteProviderPending = createAction<IProviderStateContext>(
  ProviderActionEnums.deleteProviderPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteProviderSuccess = createAction<
  IProviderStateContext,
  IProvider
>(ProviderActionEnums.deleteProviderSuccess, (Provider: IProvider) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Provider,
}));

export const deleteProviderError = createAction<IProviderStateContext>(
  ProviderActionEnums.deleteProviderError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
