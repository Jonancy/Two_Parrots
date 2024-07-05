import { url } from "../index.api";

export const addProduct = (form: FormData) => {
  return url.post("/admin/product/addProducts", form);
};

export const addProductVariant = (form: FormData, id: string) => {
  return url.post(`/admin/product/${id}/createVariant`, form);
};

export const getAllProducts = () => {
  return url.get("/admin/products/getProducts");
};
