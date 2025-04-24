export interface Patient {
  id: string;
  user?: {
    name?: string;
    surname?: string;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: number;
  purpose?: string;
}

export interface Provider {
  id?: string;
  title?: string;
  user?: {
    name?: string;
    surname?: string;
  };
}

export type IProvider = Provider;
