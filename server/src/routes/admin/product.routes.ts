import { Router } from "express";
import { productController } from "../../controllers/product.controller";
import { handleMultipleFileUpload } from "../../middlewares/upload/upload.middleware";
import { uploadFile } from "../../utils/multer-manager";
import { checkProductExists } from "../../middlewares/product/product.middleware";

export const adminProductRoutes = Router();

adminProductRoutes.post(
  "/createProduct",
  // AdminAuthRole(),
  productController.createProduct
);

adminProductRoutes.post(
  "/:productId/createVariant",
  // AdminAuthRole(),
  uploadFile.fields([{ name: "image", maxCount: 10 }]),
  checkProductExists,
  handleMultipleFileUpload(["image"], "twoParrot"),
  productController.createProductVariants
);

adminProductRoutes.get("/getProducts", productController.getAllProducts);
