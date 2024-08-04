import { Router } from "express";
import { productController } from "../../controllers/product.controller";

export const userProductRoutes = Router();

userProductRoutes.get("/getProducts", productController.getAllProducts);

userProductRoutes.get(
  "/specificProduct/:productId",
  productController.getSpecificProduct
);

userProductRoutes.get(
  "/specificProduct/productSuggestions/:productId",
  productController.getSpecificProductsSuggestions
);

userProductRoutes.get("/filterTypes", productController.getFilterTypes);

userProductRoutes.get("/filterProducts", productController.getFilteredProducts);
