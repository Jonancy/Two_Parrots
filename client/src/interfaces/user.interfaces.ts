export interface IUserState {
  userId: string;
  picture: string;
  name: string;
  email: string;
  number: string;
}

export interface IUserWithAccessToken extends IUserState {
  token: string;
}
