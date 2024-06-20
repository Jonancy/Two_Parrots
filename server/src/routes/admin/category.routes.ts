import { Router } from "express";
import { productController } from "../../controllers/product.controller";
import { AdminAuthRole } from "../../middlewares/auth/roleAuth.middleware";
import { validateSchema } from "../../validations/validator";
import { categorySchema } from "../../schemas/product.schema";

export const categoryRoutes = Router();

categoryRoutes.post(
  "/addCategory",
  AdminAuthRole(),
  validateSchema(categorySchema),
  productController.addProducts
);
