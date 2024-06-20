import { Router } from "express";
import { productController } from "../../controllers/product.controller";
import { AdminAuthRole } from "../../middlewares/auth/roleAuth.middleware";
import { handleMultipleFileUpload } from "../../middlewares/upload/upload.middleware";
import { uploadFile } from "../../utils/multer-manager";

export const productRoutes = Router();

productRoutes.post(
  "/addCategories",
  AdminAuthRole(),
  productController.addProducts
);

productRoutes.post(
  "/addProducts",
  // AdminAuthRole(),
  uploadFile.fields([{ name: "image", maxCount: 5 }]),
  handleMultipleFileUpload(["image"], "twoParrot"),
  productController.createProduct
);
