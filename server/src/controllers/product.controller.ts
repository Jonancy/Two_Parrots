import { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";
import { productService } from "../services/product.service";
import { ICategory } from "../interfaces/product.interfaces";
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
}

export const productController = new ProductController();
