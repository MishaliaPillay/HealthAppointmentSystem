import { getAxiosInstace } from "@/utils/axiosInstance";
import { useContext, useReducer } from "react";
import { LocationReducer } from "./reducer";
import {
  INITIAL_STATE,
  LocationActionContext,
  LocationStateContext,
} from "./context";
import {
  getPlacesByDescriptionError,
  getPlacesByDescriptionPending,
  getPlacesByDescriptionSuccess,
  getPlacesByStateError,
  getPlacesByStatePending,
  getPlacesByStateSuccess,
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
  return (
    <LocationStateContext.Provider value={state}>
      <LocationActionContext.Provider
        value={{
          getPlacesByDescription,
          getPlacesByState,
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
