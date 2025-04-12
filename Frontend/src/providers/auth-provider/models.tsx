//User object interface
export interface IUser {
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    UserId: string;
    Role: string;
  }
  export interface ILoginResponse{
    token:string;
}
export interface ILoginResquest{
    email: string,
    password: string
}
