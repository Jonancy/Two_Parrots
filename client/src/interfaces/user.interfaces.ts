export interface IUserState {
  userId: string;
  picture: string;
  name: string;
  email: string;
}

export interface IUserRegisterDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}
