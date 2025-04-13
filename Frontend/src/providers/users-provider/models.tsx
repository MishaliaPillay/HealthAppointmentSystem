"user client"
import { ConMethodReflist } from "../../models/enums/ReflistConMethod";

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

export interface IProvider{
     User:IUser,
     Title:string, 
     PhoneNumber:string,
     Biography:string,
     YearsOfExperience:number,
     MaxAppointmentsPerDay:number,
     Qualification:string
}

export interface IPatient{
 User:IUser,
 Title:string,
 DateOfBirth:Date,
 PhoneNumber:string,
 Address:string,
 City:string,
 Province:string,
 PostalCode:string,
 Country:string,
 PreferredContactMethod:ConMethodReflist

}
