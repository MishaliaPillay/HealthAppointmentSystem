// types.ts
export type Specialty = {
  id: string;
  name: string;
};

export type Facility = {
  id: string;
  name: string;
  specialties: string[];
  address: string;
  distance: number;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  facilityId: string;
  bio: string;
  rating: number;
  image: string;
};

export type TimeSlot = {
  id: string;
  doctorId: string;
  time: string;
  date: string;
  available: boolean;
};
