export interface UserModel{
  id? : string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const initialUser={
  firstName: "",
  lastName: "",
  fullName: "",
  userName: "",
  email: "",
  password: "",
  isAdmin: false,
}