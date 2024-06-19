//This is made for getting the details like requesting from the client/http
export interface UserRegisterDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}
