import { Router } from "express";
import { validateSchema } from "../../validator";
import { categorySchema } from "../../schemas/product.schema";
import { categoryController } from "../../controllers/category.controller";

export const categoryRoutes = Router();

categoryRoutes.get("/", categoryController.getCategories);

categoryRoutes.post(
  "/",
  validateSchema(categorySchema),
  categoryController.createCategory
);
