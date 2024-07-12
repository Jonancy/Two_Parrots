import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { axiosInstance, privateAxiosInstance } from "../index.api";
import { IProduct } from "@/interfaces/product.interfaces";
import { IProductDTO } from "@/dtos/product.dto";

export const addProduct = async (
  form: IProductDTO
): Promise<IApiResponse<null>> => {
  return (await privateAxiosInstance.post("/admin/product/createProduct", form))
    .data;
};

export const addProductVariant = async (
  form: FormData,
  id: string | undefined
): Promise<IApiResponse<null>> => {
  return (
    await privateAxiosInstance.post(`/admin/product/${id}/createVariant`, form)
  ).data;
};

export const getAllProducts = async (): Promise<IApiResponse<IProduct[]>> => {
  return (await privateAxiosInstance.get("/admin/product/getProducts")).data;
  // return handleError(e as AxiosError);
};
