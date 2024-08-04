//This is made for getting the details like requesting from the client/http
export interface UserRegisterDTO {
  userId?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  confirmPassword?: string;
}

export interface UserServiceRegisterDTO {
  userId?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
}
export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface IUpdateUserDetailsDTO {
  name: string;
  email: string;
  location: string;
  phoneNumber?: string;
}

export interface IUpdateUserPasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
