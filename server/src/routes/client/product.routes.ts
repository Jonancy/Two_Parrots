import { Router } from "express";
import { productController } from "../../controllers/product.controller";

export const userProductRoutes = Router();

userProductRoutes.get("/getProducts", productController.getAllProducts);

userProductRoutes.get("/:productId", productController.getSpecificProduct);
