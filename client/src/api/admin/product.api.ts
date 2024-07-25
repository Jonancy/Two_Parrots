import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { privateAxiosInstance } from "../index.api";
import { IProduct } from "@/interfaces/product.interfaces";
import { IProductDTO, ISizeUpdateDTO } from "@/dtos/product.dto";

export const addProduct = async (
  form: IProductDTO,
): Promise<IApiResponse<null>> => {
  return (await privateAxiosInstance.post("/admin/product/createProduct", form))
    .data;
};

export const addProductVariant = async (
  form: FormData,
  id: string | undefined,
): Promise<IApiResponse<null>> => {
  return (
    await privateAxiosInstance.post(`/admin/product/${id}/createVariant`, form)
  ).data;
};

export const getAllProducts = async (): Promise<IApiResponse<IProduct[]>> => {
  return (await privateAxiosInstance.get("/admin/product/getProducts")).data;
  // return handleError(e as AxiosError);
};

export const updateProduct = async (
  form: IProductDTO,
  productId: string,
): Promise<IApiResponse<null>> => {
  console.log(form);

  return (
    await privateAxiosInstance.patch(
      `/admin/product/${productId}/updateProduct`,
      form,
    )
  ).data;
};

export const updateProductImages = async (
  form: FormData,
  productId: string,
): Promise<IApiResponse<null>> => {
  console.log(form);

  return (
    await privateAxiosInstance.patch(
      `/admin/product/${productId}/updateProductImage`,
      form,
    )
  ).data;
};

export const updateProductSizes = async (
  form: ISizeUpdateDTO,
  variantId: string,
): Promise<IApiResponse<null>> => {
  console.log(form);

  return (
    await privateAxiosInstance.patch(
      `/admin/product/${variantId}/updateProuctSize`,
      form,
    )
  ).data;
};
