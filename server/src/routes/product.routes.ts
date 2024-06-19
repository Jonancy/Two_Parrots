import { Router } from "express";
import { productController } from "../controllers/product.controller";
import { AdminAuthRole } from "../middlewares/auth/roleAuth.middleware";

export const productRoutes = Router();

productRoutes.post(
  "/addCategories",
  AdminAuthRole(),
  productController.addProducts
);
