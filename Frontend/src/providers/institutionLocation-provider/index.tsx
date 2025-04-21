"use client";
import { getAxiosInstace } from "@/utils/axiosInstance";
import { useContext, useReducer } from "react";
import { LocationReducer } from "./reducer";
import {
  INITIAL_STATE,
  LocationActionContext,
  LocationStateContext,
} from "./context";
import {
  getAllPlacesError,
  getAllPlacesPending,
  getAllPlacesSuccess,
  getPlacesByDescriptionError,
  getPlacesByDescriptionPending,
  getPlacesByDescriptionSuccess,
  getPlacesByStateError,
  getPlacesByStatePending,
  getPlacesByStateSuccess,
  getInstitutionsWithSpecialtyPending,
  getInstitutionsWithSpecialtySuccess,
  getInstitutionsWithSpecialtyError,
} from "./actions";

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(LocationReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  //Get places by the description
  const getPlacesByDescription = async (description: string) => {
    dispatch(getPlacesByDescriptionPending());
    const endpoint = `the end point here`;
    await instance
      .post(endpoint, description)
      .then((response) => {
        dispatch(getPlacesByDescriptionSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getPlacesByDescriptionError());
      });
  };
  //encodeURIComponent(specialty)  because multiword another multi-word specialty will break request
  const getInstitutionsWithSpecialty = async (specialty: string) => {
    dispatch(getInstitutionsWithSpecialtyPending());

    const endpoint = `/ProviderInstution/GetInstitutionsWithProvidersBySpecialty?specialty=${encodeURIComponent(
      specialty
    )}`;

    try {
      const response = await instance.get(endpoint);
      const result = response.data?.result || [];
      console.log("Fetched institutions with specialty:", result);
      dispatch(getInstitutionsWithSpecialtySuccess(result));
    } catch (error) {
      console.error("Failed to fetch institutions:", error);
      dispatch(getInstitutionsWithSpecialtyError());
    }
  };

  const getPlacesByState = async (state: string) => {
    dispatch(getPlacesByStatePending());
    const endpoint = `the end point here`;
    await instance
      .post(endpoint, state)
      .then((response) => {
        dispatch(getPlacesByStateSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getPlacesByStateError());
      });
  };

  const getAllPlaces = async () => {
    dispatch(getAllPlacesPending());
    const endpoint = `/Institution/GetAllInstitutions`;
    await instance
      .get(endpoint)
      .then((response) => {
        // console.log(response);
        console.log("Response data:", response?.data?.result?.items);
        // if (response.data && response.data.length > 0) {
        //   console.log("Data received!");
        // } else {
        //   console.log(" No data returned.");
        // }
        dispatch(getAllPlacesSuccess(response?.data?.result?.items));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getAllPlacesError());
      });
  };
  return (
    <LocationStateContext.Provider value={state}>
      <LocationActionContext.Provider
        value={{
          getPlacesByDescription,
          getPlacesByState,
          getAllPlaces,
          getInstitutionsWithSpecialty,
        }}
      >
        {children}
      </LocationActionContext.Provider>
    </LocationStateContext.Provider>
  );
};
export const useLocationState = () => {
  const context = useContext(LocationStateContext);
  if (!context) {
    throw new Error(
      "LocationStateContext must be used within a LocationProvider"
    );
  }
  return context;
};

export const useLocationActions = () => {
  const context = useContext(LocationActionContext);
  if (!context) {
    throw new Error(
      "LocationActionContext must be used within a LocationProvider"
    );
  }
  return context;
};