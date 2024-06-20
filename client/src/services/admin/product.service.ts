import { url } from "../index.service";

export const addProduct = (form: FormData) => {
  return url.post("/product/addProducts", form);
};
