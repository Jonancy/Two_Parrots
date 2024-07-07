import { IApiResponse } from "@/interfaces/apiResponse.interfaces";
import { axiosInstance } from "../index.api";
import { IProduct } from "@/interfaces/product.interfaces";

export const addProduct = (form: FormData) => {
  return axiosInstance.post("/admin/product/addProducts", form);
};

export const addProductVariant = (form: FormData, id: string) => {
  return axiosInstance.post(`/admin/product/${id}/createVariant`, form);
};

export const getAllProducts = () => {
  return axiosInstance.get("/admin/products/getProducts");
};
