import { Router } from "express";
import { productController } from "../../controllers/product.controller";
import { AdminAuthRole } from "../../middlewares/auth/roleAuth.middleware";
import { handleMultipleFileUpload } from "../../middlewares/upload/upload.middleware";
import { uploadFile } from "../../utils/multer-manager";
import { checkProductExists } from "../../middlewares/product/product.middleware";

export const productRoutes = Router();

productRoutes.post(
  "/createCategory",
  AdminAuthRole(),
  productController.createCategory
);

productRoutes.post(
  "/createProduct",
  // AdminAuthRole(),
  productController.createProduct
);

productRoutes.post(
  "/:productId/createVariant",
  // AdminAuthRole(),
  uploadFile.fields([{ name: "image", maxCount: 10 }]),
  checkProductExists,
  handleMultipleFileUpload(["image"], "twoParrot"),
  productController.createProductVariants
);

productRoutes.get("/getProducts", productController.getAllProducts);
