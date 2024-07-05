// import {
//   LoginUserTypes,
//   RegisterUserTypes,
// } from "../../interfaces/types/auth/logiRegi.interfaces";
// import { url } from "../index.service";

import { IUserRegisterDTO, IUserState } from "@/interfaces/user.interfaces";
import { url } from "../index.api";
import { IApiResponse } from "@/interfaces/apiResponse.interface";

export const RegisterUser = (form: IUserRegisterDTO) => {
  return url.post("/auth/registerUser", form);
};

// export const LoginUser = (form: LoginUserTypes) => {
//   return url.post("/auth/loginUser", form);
// };

// export const LogoutUser = () => {
//   return url.post("/auth/logout");
// };

// export const getAccessToken = () => {
//   return url.get("/auth/refresh");
// };

export const getUsers = async (): Promise<IApiResponse<IUserState[]>> => {
  const res = await url.get("/user/getUsers");
  return res.data;
};
