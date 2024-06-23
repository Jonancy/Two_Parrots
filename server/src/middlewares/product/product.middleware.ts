import { Request, Response, NextFunction } from "express-serve-static-core";
import { productService } from "../../services/product.service";
import CustomError from "../../handlers/errors/customError";

export const checkProductExists = async (
  req: Request<{ productId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    console.log(productId);

    const productExists = await productService.getProductById(productId);

    if (!productExists) {
      throw new CustomError("No product found", 404);
    }
    next();
  } catch (e) {
    next(e);
  }
};
