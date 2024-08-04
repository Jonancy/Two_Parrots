export interface IUserState {
  userId?: string;
  picture?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;
}

export interface IUserWithAccessToken extends IUserState {
  token: string;
}
