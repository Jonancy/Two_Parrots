import { Request, Response, NextFunction } from "express-serve-static-core";
import { productService } from "../services/product.service";
import { ICategory, IVariant } from "../interfaces/product.interfaces";
import { successHandler } from "../handlers/success/successHandler";
import CustomError from "../handlers/errors/customError";
import { IProductDTO } from "../dtos/product.dto";

class ProductController {
  createCategory = async (
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
    req: Request<{}, {}, IProductDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productDTO = req.body;

      const createdProduct = await productService.createProduct(productDTO);

      if (!createdProduct) {
        throw new CustomError(
          "Something went wrong while creation of the product ",
          500
        );
      }

      successHandler(res, 201, null, "Product added successfully");
    } catch (e) {
      next(e);
    }
  };

  createProductVariants = async (
    req: Request<{ productId: string }, {}, IVariant>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const variantDTO = req.body;
      const productId = req.params.productId;
      const files = req.images;
      console.log(variantDTO);

      const createVariant = await productService.createProductVariants(
        productId,
        variantDTO,
        files
      );

      if (!createVariant) {
        throw new CustomError(
          "Something went wrong while addition of the variant ",
          500
        );
      }

      successHandler(
        res,
        201,
        null,
        "Variant of the product added successfully"
      );
    } catch (e) {
      next(e);
    }
  };

  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getAllProducts();

      successHandler(res, 200, products, "All products");
    } catch (e) {
      next(e);
    }
  };
}

export const productController = new ProductController();
