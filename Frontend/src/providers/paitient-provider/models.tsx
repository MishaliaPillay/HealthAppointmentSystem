export interface IPatientRegistration {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
   //TODO:KM May have to remove at some point
  Password:string;
  Role: string;
  DateOfBirth: Date;
  Address: string;
  City: string;
  Province: string;
  PostalCode: string;
  Country: string;
}
export interface IPatient {
  _id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  //TODO:KM May have to remove at some point
  Role: string;
  DateOfBirth: Date;
  Address: string;
  City: string;
  Province: string;
  PostalCode: string;
  Country: string;
}
