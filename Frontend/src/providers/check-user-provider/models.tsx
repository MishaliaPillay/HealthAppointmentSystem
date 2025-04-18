
export interface IUserCheck {
  emailAddress: string;
  userName: string;
}

export interface IUserExists {
  result: {
    emailExists: string;
    userNameExists: string;
  };
}
