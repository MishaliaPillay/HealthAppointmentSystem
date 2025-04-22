"use client";
import { createAction } from "redux-actions";
import { IProvidersInInstitution, IProvidersInStateContext } from "./context";

export enum ProviderInActionEnums {
  //For get providers in an institution by id
  getProvidersInInstitutionPending = "Get_PROVIDERSIN_PENDING",
  getProvidersInInstitutionSuccess = "Get_PROVIDERSIN_SUCCESS",
  getProvidersInInstitutionError = "Get_PROVIDERSIN_ERROR",
}

// get providers in a certain instition{hospital/clinics etc}
//get providers in institution Pending

export const getProvidersInInstitutionPending =
  createAction<IProvidersInStateContext>(
    ProviderInActionEnums.getProvidersInInstitutionPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

//get providers in institution  success
export const getProvidersInInstitutionSuccess = createAction<
  IProvidersInStateContext,
  { result: IProvidersInInstitution[] }
>(ProviderInActionEnums.getProvidersInInstitutionSuccess, (data) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  providers: data,
}));

//get providers in institution is Failed
export const getProvidersInInstitutionError =
  createAction<IProvidersInStateContext>(
    ProviderInActionEnums.getProvidersInInstitutionError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );
