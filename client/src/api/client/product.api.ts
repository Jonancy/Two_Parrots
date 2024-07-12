import { IProduct } from "@/interfaces/product.interfaces";
import { axiosInstance } from "../index.api";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";

export const getAllProductClient = async (): Promise<
  IApiResponse<IProduct[]>
> => {
  return (await axiosInstance.get("/user/product/getProducts")).data;
  // return handleError(e as AxiosError);
};
