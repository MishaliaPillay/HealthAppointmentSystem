"use client";
import { createContext } from "react";

export interface ILocation {
  id?: string;
  address: string;
  state: string; // state is the region nor secrtion according to google maps
  postalCode: number;
  country: string;
  facilityType: string;
  description: string;
  placeId: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
}

export interface ILocationStateContext {
  readonly isPending: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
  readonly location?: ILocation;
  readonly locations?: ILocation[];
}

export const INITIAL_STATE: ILocationStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export interface ILocationActionContext {
  getPlacesByDescription: (description: string) => void; // check the method properly
  getPlacesByState: (state: string) => void;
  getAllPlaces: () => void;
}

export const LocationStateContext =
  createContext<ILocationStateContext>(INITIAL_STATE);
export const LocationActionContext = createContext<
  ILocationActionContext | undefined
>(undefined);
