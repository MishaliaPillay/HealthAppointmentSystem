//Auth object interface
export interface IAuth {
  id?: string;
  title: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: true;
  phoneNumber: string;
  userName: string;
  password: string;
  role: string;
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  preferredContactMethod?: number;
  biography?: string;
  yearsOfExperience?: string;
  maxAppointmentsPerDay?: string;
  qualification?: string;
  specialtyName?: string;
}

export interface ISignInRequest {
  userNameOrEmailAddress: "string";
  password: "string";
  rememberClient: true;
}
export interface ISignInResponse {
  result: {
    accessToken: string;
  };
}
