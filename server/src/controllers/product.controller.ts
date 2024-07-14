import { Request, Response, NextFunction } from "express-serve-static-core";
import { productService } from "../services/product.service";
import { IVariant } from "../interfaces/product.interfaces";
import { successHandler } from "../handlers/success/successHandler";
import CustomError from "../handlers/errors/customError";
import { IProductDTO } from "../dtos/product.dto";

class ProductController {
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

  getSpecificProduct = async (
    req: Request<{ productId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productId = req.params.productId;
      const product = await productService.getSpecificProduct(productId);

      if (!product) {
        throw new CustomError("No product found", 404);
      }

      successHandler(res, 200, product, "Required product");
    } catch (e) {
      next(e);
    }
  };
}

export const productController = new ProductController();
