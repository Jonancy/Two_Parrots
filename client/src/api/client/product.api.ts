import {
  IFilterProduct,
  IFilterProducts,
  IFilterTypes,
  IMiniProduct,
  IProduct,
  IProductReviews,
} from "@/interfaces/product.interfaces";
import { axiosInstance, privateAxiosInstance } from "../index.api";
import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { IProductReviewDTO } from "@/dtos/product.dto";

export const getAllProductClient = async (
  filters: IFilterProduct,
): Promise<IApiResponse<IMiniProduct[]>> => {
  return (
    await axiosInstance.get("/user/product/getProducts", {
      params: { filters },
    })
  ).data;
};

export const getSpecificProductClient = async (
  productId: string,
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
  productId: string,
): Promise<IApiResponse<IMiniProduct[]>> => {
  return (
    await axiosInstance.get(
      `/user/product/specificProduct/productSuggestions/${productId}`,
    )
  ).data;
};

export const wishListProduct = async (
  productId: string,
  userId: string,
): Promise<IApiResponse<null>> => {
  return (
    await privateAxiosInstance.post(
      `/user/product/wishList/${userId}/${productId}`,
    )
  ).data;
};

export const productReviews = async (
  productId: string,
): Promise<IApiResponse<IProductReviews[]>> => {
  return (
    await axiosInstance.get(
      `/user/product/specificProduct/reviews/${productId}`,
    )
  ).data;
};

export const addProductReviews = async (
  productId: string,
  userId: string,
  review: IProductReviewDTO,
): Promise<IApiResponse<null>> => {
  return (
    await privateAxiosInstance.post(
      `/user/product/reviewProduct/${userId}/${productId}`,
      review,
    )
  ).data;
};
