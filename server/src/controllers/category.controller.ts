import { Request, Response, NextFunction } from "express-serve-static-core";
import { categoryService } from "../services/category.service";
import CustomError from "../handlers/errors/customError";
import { successHandler } from "../handlers/success/successHandler";
import { ICategory } from "../interfaces/product.interfaces";

class CategoryController {
  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.getCategories();

      return successHandler(res, 200, categories, "All categories");
    } catch (e) {
      next(e);
    }
  };

  createCategory = async (
    req: Request<{}, {}, ICategory>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryDTO = req.body;

      const categoryExist = await categoryService.checkCategoryExistence(
        categoryDTO.categoryName
      );

      if (categoryExist) {
        throw new CustomError("The category already exists", 409);
      }

      const category = await categoryService.addCategories(categoryDTO);

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

export const categoryController = new CategoryController();
