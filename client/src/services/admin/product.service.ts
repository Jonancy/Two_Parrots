import { url } from "../index.service";

export const addProduct = (form: FormData) => {
  return url.post("/admin/product/addProducts", form);
};

export const addProductVariant = (form: FormData, id: string) => {
  return url.post(`/admin/product/${id}/createVariant`, form);
};
