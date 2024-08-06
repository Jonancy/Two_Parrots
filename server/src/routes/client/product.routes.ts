import { Router } from "express";
import { productController } from "../../controllers/product.controller";
import { checkProductExists } from "../../middlewares/product/product.middleware";
import { ClientAuthRole } from "../../middlewares/auth/roleAuth.middleware";

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

userProductRoutes.get("/wishList/:userId", productController.getUsersWishlist);

userProductRoutes.get("/filterTypes", productController.getFilterTypes);

userProductRoutes.get("/filterProducts", productController.getFilteredProducts);

userProductRoutes.post(
  "/wishList/:userId/:productId",
  ClientAuthRole(),
  checkProductExists,
  productController.productWishlist
);

userProductRoutes.post(
  "/reviewProduct/:userId/:productId",
  ClientAuthRole(),
  checkProductExists,
  productController.addProductReviews
);

userProductRoutes.get(
  "/specificProduct/reviews/:productId",
  productController.getSpecificProductReviews
);
