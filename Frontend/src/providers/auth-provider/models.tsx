//User object interface
export interface IUser {
    id?:string,
    title:string,
    name:string,
    surname:string, 
    emailAddress:string,
    phoneNumber:string,
    userName:string,
    password:string,
    role:string; 
    dateOfBirth?:Date,
    address?:string,
    city?:string,
    province?:string,
    postalCode?:string,
    country?:string,
    preferredContactMethod?:string
    Password?:string,
    Biography?:string,
    YearsOfExperience?:string,
    MaxAppointmentsPerDay?:string,
    Qualification?:string
  }
export interface ILoginResquest{
    email: string,
    password: string
}
