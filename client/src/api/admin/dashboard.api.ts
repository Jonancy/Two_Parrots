import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { privateAxiosInstance } from "../index.api";

export const checkAdmin = async (): Promise<IApiResponse<null>> => {
  return (await privateAxiosInstance.get("/admin/dashboard")).data;
};
