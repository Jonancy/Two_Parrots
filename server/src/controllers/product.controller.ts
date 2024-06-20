import { Request, Response, NextFunction } from "express-serve-static-core";
import { productService } from "../services/product.service";
import {
  ICategory,
  IProduct,
  IVariant,
} from "../interfaces/product.interfaces";
import { successHandler } from "../handlers/success/successHandler";
import CustomError from "../handlers/errors/customError";

class ProductController {
  addProducts = async (
    req: Request<{}, {}, ICategory>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryDTO = req.body;

      const categoryExist = await productService.checkCategoryExistence(
        categoryDTO.categoryName
      );

      if (categoryExist) {
        throw new CustomError("The category already exists", 409);
      }

      const category = await productService.addCategories(categoryDTO);

      if (!category) {
        throw new CustomError(
          "Something went wrong while addition of the category",
          500
        );
      }

      return successHandler(res, 201, null, "Category added successfully.");
    } catch (e) {
      next(e);
    }
  };

  createProduct = async (
    req: Request<{}, {}, IProduct>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productDTO = req.body;

      const variants: IVariant[] = productDTO.variants;

      // Assign uploaded image URLs to the corresponding variants
      const uploadedFiles = req.images as { [key: string]: string[] };
      for (const color in uploadedFiles) {
        const variantIndex = variants.findIndex((variant) =>
          variant.color.toLowerCase().includes(color)
        );
        if (variantIndex !== -1) {
          const variant = variants[variantIndex];
          if (!variant.images) {
            variant.images = [];
          }
          variant.images = uploadedFiles[color].map((url: string) => ({ url }));
        }
      }

      const product: IProduct = { ...productDTO, variants };

      const createdProduct = await productService.createProduct(product);
      res.status(201).json(createdProduct);
    } catch (e) {
      next(e);
    }
  };
}

export const productController = new ProductController();
