import { Request, Response, NextFunction } from "express-serve-static-core";
import { productService } from "../services/product.service";
import {
  IFilterProduct,
  IFilterTypes,
  IMiniProduct,
  IProduct,
  IVariant,
} from "../interfaces/product.interfaces";
import { successHandler } from "../handlers/success/successHandler";
import CustomError from "../handlers/errors/customError";
import {
  IProductDTO,
  IProductPictureDTO,
  IProductReviewDTO,
  ISizeUpdateDTO,
} from "../dtos/product.dto";
import { redisClient } from "../config/redis/redis";

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

  getAllProducts = async (
    req: Request<{}, {}, {}, IFilterProduct>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filters = req.query;

      let products: IMiniProduct[];
      const cacheKey = `products:${JSON.stringify(filters.filters)}`;

      const cachedProducts = await redisClient.get(cacheKey);

      if (cachedProducts) {
        products = JSON.parse(cachedProducts);
      } else {
        products = await productService.getAllProducts(req.query);

        const productDetails = JSON.stringify(products);

        await redisClient.setEx(cacheKey, 400, productDetails);
      }

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

  getSpecificProductReviews = async (
    req: Request<{ productId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productId = req.params.productId;
      const productReviews = await productService.getSpecificProductReviews(
        productId
      );

      // if (!product) {
      //   throw new CustomError("No product found", 404);
      // }

      successHandler(res, 200, productReviews, "Product reviews");
    } catch (e) {
      next(e);
    }
  };

  getSpecificProductsSuggestions = async (
    req: Request<{ productId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productId = req.params.productId;

      const product = await productService.getProductSuggestions(productId);

      // if (!product) {
      //   throw new CustomError("No product found", 404);
      // }

      successHandler(res, 200, product, "Product suggestions");
    } catch (e) {
      next(e);
    }
  };

  getFilterTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filterTypes: IFilterTypes = await productService.getFilterTypes();

      successHandler(res, 200, filterTypes, "These are the filter types");
    } catch (e) {
      next(e);
    }
  };

  getFilteredProducts = async (
    req: Request<{}, {}, {}, IFilterProduct>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page = 1, limit = 6, filters } = req.query;

      console.log(req.query);

      const products = await productService.getFilteredProducts({
        page,
        limit,
        filters,
      });

      successHandler(res, 200, products, "All products");
    } catch (e) {
      next(e);
    }
  };

  updateProduct = async (
    req: Request<{ productId: string }, {}, IProductDTO>,
    res: Response,
    next: NextFunction
  ) => {
    const productDTO = req.body;
    const { productId } = req.params;

    const updateProduct = await productService.updateProduct(
      productDTO,
      productId
    );

    if (!updateProduct) {
      throw new CustomError("Updation failed", 400);
    }

    return successHandler(
      res,
      201,
      null,
      "Product has been updated successfully."
    );
  };

  updateProductImages = async (
    req: Request<{ productId: string }, {}, IProductPictureDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const variantDTO = req.body;
      const productId = req.params.productId;
      const files = req.images;

      console.log(req.body, "aas");
      console.log(files, "lol");

      let image: { productImageId?: string; url?: File | null }[] =
        typeof variantDTO.images === "string" && JSON.parse(variantDTO.images);
      console.log(image);

      const deletedImages = image?.filter(
        (image) => image.productImageId != undefined
      );

      const images: IProductPictureDTO = {
        variantId: variantDTO.variantId,
        images: deletedImages,
      };

      await productService.updateProductImages(images, files);

      successHandler(res, 201, null, "Pass");
    } catch (e) {
      // console.log(e, "eheheh");

      next(e);
    }
  };

  updateProductSize = async (
    req: Request<{ variantId: string }, {}, ISizeUpdateDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productDTO = req.body;
      const { variantId } = req.params;

      const updateProduct = await productService.updateProductSize(
        productDTO,
        variantId
      );

      if (!updateProduct) {
        throw new CustomError("Updation failed", 400);
      }

      return successHandler(
        res,
        201,
        null,
        "Product has been updated successfully."
      );
    } catch (e) {
      next(e);
    }
  };

  softDeleteProduct = async (
    req: Request<{ productId: string }, {}, ISizeUpdateDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productId = req.params.productId;

      const updatedProduct = await productService.softDeleteProduct(productId);

      if (!updatedProduct) {
        throw new CustomError("Updation failed", 400);
      }

      return successHandler(
        res,
        201,
        null,
        "Product has been updated successfully."
      );
    } catch (e) {
      next(e);
    }
  };

  productWishlist = async (
    req: Request<{ productId: string; userId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productId, userId } = req.params;
      const previousWishlist = await productService.checkProductWishList(
        productId,
        userId
      );

      if (previousWishlist) {
        const deleteWishList = await productService.deleteProductWishList(
          productId,
          userId
        );

        if (!deleteWishList) {
          throw new CustomError("Failed to remove product from wishlist", 400);
        }
        return successHandler(
          res,
          201,
          null,
          "Product successfully removed from your wishlist"
        );
      } else {
        const addWishList = await productService.addProductWishList(
          productId,
          userId
        );

        if (!addWishList) {
          throw new CustomError("Failed to add product to wishlist", 400);
        }

        return successHandler(
          res,
          201,
          null,
          "Product successfully added to your wishlist"
        );
      }
    } catch (e) {
      next(e);
    }
  };

  addProductReviews = async (
    req: Request<{ productId: string; userId: string }, {}, IProductReviewDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productId, userId } = req.params;
      const reviewDTO = req.body;

      const addReview = await productService.addProductReviews(
        productId,
        userId,
        reviewDTO
      );

      if (!addReview) {
        throw new CustomError("Addition of review failed", 400);
      }

      return successHandler(
        res,
        201,
        null,
        "Review has been posted successfully."
      );
    } catch (e) {
      next(e);
    }
  };

  getUsersWishlist = async (
    req: Request<{ userId: string }, {}, IProductReviewDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.userId;

      const wishLists = await productService.getWishlist(userId);

      return successHandler(res, 200, wishLists, "Wishlist of user .");
    } catch (e) {
      next(e);
    }
  };
}

export const productController = new ProductController();
