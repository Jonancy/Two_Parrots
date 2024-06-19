import { Router } from "express";
import { productController } from "../controllers/product.controller";
import { AdminAuthRole } from "../middlewares/auth/roleAuth.middleware";

export const categoryRoutes = Router();

categoryRoutes.post(
  "/addCategory",
  AdminAuthRole(),
  productController.addProducts
);
