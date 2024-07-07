// import {
//   LoginUserTypes,
//   RegisterUserTypes,
// } from "../../interfaces/types/auth/logiRegi.interfaces";
// import { axiosInstance } from "../index.service";

import { IUserState } from "@/interfaces/user.interfaces";
import { ILoginDTO, IUserRegisterDTO } from "@/interfaces/auth.interfaces";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { axiosInstance } from "../index.api";

export const RegisterUser = (form: IUserRegisterDTO) => {
  return axiosInstance.post("/auth/registerUser", form);
};

export const LoginUser = (form: ILoginDTO) => {
  // const privateaxiosInstance = usePrivateAPI();
  return axiosInstance.post("/auth/loginUser", form);
};

// export const LogoutUser = () => {
//   return axiosInstance.post("/auth/logout");
// };

// export const getAccessToken = () => {
//   return axiosInstance.get("/auth/refresh");
// };

export const getUsers = async (): Promise<IApiResponse<IUserState[]>> => {
  const res = await axiosInstance.get("/user/getUsers");
  return res.data;
};
