import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { privateAxiosInstance } from "../index.api";
import { ICategory } from "@/interfaces/product.interfaces";

export const getCategories = async (): Promise<
  IApiResponse<ICategory[] | []>
> => {
  return (await privateAxiosInstance.get("/admin/category")).data;
};
