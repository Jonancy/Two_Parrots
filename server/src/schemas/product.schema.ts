import * as yup from "yup"; // Import all of yup
import { ICategory } from "../interfaces/product.interfaces";

export const categorySchema: yup.ObjectSchema<ICategory> = yup.object({
  categoryId: yup.string(),
  categoryName: yup.string().required(),
});
