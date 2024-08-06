// import {
//   LoginUserTypes,
//   RegisterUserTypes,
// } from "../../interfaces/types/auth/logiRegi.interfaces";
// import { axiosInstance } from "../index.service";

import { IUserState, IUserWithAccessToken } from "@/interfaces/user.interfaces";
import { ILoginDTO, IUserRegisterDTO } from "@/interfaces/auth.interfaces";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { axiosInstance } from "../index.api";

export const RegisterUser = async (
  form: IUserRegisterDTO,
): Promise<IApiResponse<IUserWithAccessToken>> => {
  return (await axiosInstance.post("/auth/registerUser", form)).data;
};

export const LoginUser = async (
  form: ILoginDTO,
): Promise<IApiResponse<IUserWithAccessToken>> => {
  return (await axiosInstance.post("/auth/loginUser", form)).data;
};

export const LogoutUser = async (): Promise<IApiResponse<null>> => {
  return (await axiosInstance.post("/auth/logout")).data;
};

export const getUsers = async (): Promise<IApiResponse<IUserState[]>> => {
  return (await axiosInstance.get("/user/getUsers")).data;
};
