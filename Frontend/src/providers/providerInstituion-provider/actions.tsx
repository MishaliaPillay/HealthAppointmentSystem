"use client";
import { createAction } from "redux-actions";
import { IProvidersInInstitution, IProvidersInStateContext } from "./context";

export enum ProviderInActionEnums {
  //For get providers in an institution by id
  getProvidersInInstitutionPending = "Get_PROVIDERSIN_PENDING",
  getProvidersInInstitutionSuccess = "Get_PROVIDERSIN_SUCCESS",
  getProvidersInInstitutionError = "Get_PROVIDERSIN_ERROR",

  //For get providers in an institution by speciality
  getProviderbySpecialityPending = "Get_PROVDERSPECIALITY_PENDING",
  getProviderbySpecialitySuccess = "Get_PROVDERSPECIALITY_SUCCESS",
  getProviderbySpecialityError = "Get_PROVDERSPECIALITY_ERROR",
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
  IProvidersInInstitution[]
>(
  ProviderInActionEnums.getProvidersInInstitutionSuccess,
  (Providers: IProvidersInInstitution) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Providers,
  })
);

//get providers in institution is Failed
export const getProvidersInInstitutionError =
  createAction<IProvidersInStateContext>(
    ProviderInActionEnums.getProvidersInInstitutionError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

// get providers in a certain instition{hospital/clinics etc} by speciality
//get providers in institution Pending

export const getProviderbySpecialityPending =
  createAction<IProvidersInStateContext>(
    ProviderInActionEnums.getProviderbySpecialityPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const getProviderbySpecialitySuccess = createAction<
  IProvidersInStateContext,
  IProvidersInInstitution[]
>(
  ProviderInActionEnums.getProviderbySpecialitySuccess,
  (Providers: IProvidersInInstitution) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Providers,
  })
);

export const getProviderbySpecialityError =
  createAction<IProvidersInStateContext>(
    ProviderInActionEnums.getProviderbySpecialityError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );
