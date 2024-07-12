import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { axiosInstance } from "../index.api";

export const generateAccessToken = async (): Promise<
  IApiResponse<{ token: string }>
> => {
  return (await axiosInstance.get("/auth/refresh")).data;
};
