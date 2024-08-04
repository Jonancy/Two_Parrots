import {
  IFilterProduct,
  IFilterProducts,
  IFilterTypes,
  IProduct,
} from "@/interfaces/product.interfaces";
import { axiosInstance } from "../index.api";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";

export const getAllProductClient = async (
  filters: IFilterProduct | undefined,
): Promise<IApiResponse<IProduct[]>> => {
  return (
    await axiosInstance.get("/user/product/getProducts", {
      params: { filters },
    })
  ).data;
};

export const getSpecificProductClient = async (
  productId: string | undefined,
): Promise<IApiResponse<IProduct>> => {
  return (await axiosInstance.get(`/user/product/specificProduct/${productId}`))
    .data;
};

export const getFilterTypes = async (): Promise<IApiResponse<IFilterTypes>> => {
  return (await axiosInstance.get(`/user/product/filterTypes`)).data;
};

export const getFilterProductClient = async ({
  page,
  filters,
}: IFilterProduct): Promise<IApiResponse<IFilterProducts>> => {
  return (
    await axiosInstance.get("/user/product/filterProducts", {
      params: { page, filters },
    })
  ).data;
  // return handleError(e as AxiosError);
};

export const getProductSuggestions = async (
  productId: string | undefined,
): Promise<IApiResponse<IProduct[]>> => {
  return (
    await axiosInstance.get(
      `/user/product/specificProduct/productSuggestions/${productId}`,
    )
  ).data;
};
