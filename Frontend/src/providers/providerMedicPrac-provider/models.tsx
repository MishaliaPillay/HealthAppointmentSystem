export interface IProvider {
    _id?:string;
    FirstName: string;
    LastName: string;
    Email: string;
    //TODO:KM May have to remove at some point
    Role: string;
    Title:string;
    Biography:string;
    PhoneNumber:string;
    YearsOfExperience:number;
    MaxAppointmentsPerDay:number;
    Qualification:string;
}
export interface IProviderRegisteration {
    FirstName: string;
    LastName: string;
    Email: string;
     //TODO:KM May have to remove at some point
    Role: string;
    Title:string;
    Password:string;
    Biography:string;
    PhoneNumber:string;
    YearsOfExperience:number;
    MaxAppointmentsPerDay:number;
    Qualification:string;
}
