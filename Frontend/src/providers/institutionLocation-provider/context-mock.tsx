"use client";
import { createContext } from "react";

// Location object (for Google Places etc.)
export interface ILocation {
  id?: string;
  address: string;
  state: string; // Region or section from Google Maps
  postalCode: number;
  country: string;
  facilityType: string;
  description: string;
  placeId: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
}

// Institution object based on your API structure

export interface IInstitution {
  institutionId: number;
  institutionName: string;
  description:string;
  id:number;
  
  address: string;
  providers: IProvider[];
}

// Provider object used within institutions
export interface IProvider {
  userId: number;
  userName: string;
  fullName: string;
  title: string;
  biography: string;
  phoneNumber: string;
  yearsOfExperience: number;
  maxAppointmentsPerDay: number;
  qualification: string;
  speciality: string;
  institutionId: number;
  id: string;
}

export interface ILocationStateContext {
  readonly isPending: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
  readonly institutions?: IInstitution[]; // make this non‑optional
}

export const INITIAL_STATE: ILocationStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  institutions: [], // initialize as empty array
};

export interface ILocationActionContext {
  getPlacesByDescription: (description: string) => void;
  getPlacesByState: (state: string) => void;
  getAllPlaces: () => void;
  getInstitutionsWithSpecialty: (specialty: string) => void;
}

export const LocationStateContext =
  createContext<ILocationStateContext>(INITIAL_STATE);
export const LocationActionContext = createContext<
  ILocationActionContext | undefined
>(undefined);
