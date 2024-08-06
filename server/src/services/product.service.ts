import { Prisma, Products } from "@prisma/client";
import { prisma } from "../..";
import {
  IFilterProduct,
  IFilterProducts,
  IFilterTypes,
  IMiniProduct,
  IProduct,
  IProductReviews,
  ISize,
  IVariant,
  IWishListProduct,
} from "../interfaces/product.interfaces";
import {
  IProductDTO,
  IProductPictureDTO,
  IProductReviewDTO,
  ISizeUpdateDTO,
} from "../dtos/product.dto";
import {
  productMiniSelectFields,
  productSelectFields,
} from "../utils/prismaSelectQueries";
import CustomError from "../handlers/errors/customError";
import { deleteImageCloudinary } from "../middlewares/upload/upload.middleware";

class ProductService {
  createProduct = async (data: IProductDTO): Promise<Products | null> => {
    console.log(data);

    const product = await prisma.products.create({
      data: {
        ...data,
        price: parseFloat(data.price),
      },
    });

    return product;
  };

  //!For checking if the product is available or not
  getProductById = async (productId: string): Promise<boolean> => {
    const product = await prisma.products.findFirst({
      where: { productId: productId },
    });

    return !!product;
  };

  //TODO: When the same variant is added need to check and update the same or create new variant
  createProductVariants = async (
    productId: string,
    data: IVariant,
    images: string[]
  ) => {
    const files = images;
    console.log(files);

    //!Due to the formData requirements as it only supports string and file type so JSON format or string format ma convert garera ani teslai feri array ma layeko
    let variant: ISize[] =
      typeof data.sizes === "string" && JSON.parse(data.sizes);

    console.log(variant, "aa");

    const productVariant = await prisma.productVariants.create({
      data: {
        productId: productId,
        color: data.color,
        sizes: {
          create: variant.map((size) => ({
            size: size.size,
            stock: size.stock,
          })),
        },
        images: {
          create: files.map((image) => ({ url: image })),
        },
      },
    });

    return productVariant;
  };

  getSpecificProduct = async (productId: string): Promise<IProduct> => {
    const product = await prisma.products.findFirst({
      where: { productId },
      select: productSelectFields,
    });

    return product;
  };

  getMiniProductDetails = async (): Promise<IMiniProduct[]> => {
    const product = await prisma.products.findMany({
      select: productMiniSelectFields,
    });

    return product;
  };

  getSpecificProductReviews = async (
    productId: string
  ): Promise<IProductReviews[]> => {
    const product = await prisma.review.findMany({
      where: { productId },
      select: {
        reviewId: true,
        comment: true,
        createdAt: true,
        user: { select: { userId: true, name: true, picture: true } },
      },
    });
    return product;
  };

  getProductSuggestions = async (
    productId: string
  ): Promise<IMiniProduct[]> => {
    const product = await prisma.products.findFirst({
      where: { productId },
      select: { category: true },
    });

    const productSuggestions = await prisma.products.findMany({
      where: {
        productId: { not: productId },
        category: { categoryName: product.category.categoryName },
      },
      take: 6,
      select: productMiniSelectFields,
    });

    return productSuggestions;
  };

  getAllProducts = async ({
    filters,
    limit = 6,
    page = 1,
  }: IFilterProduct): Promise<IMiniProduct[]> => {
    let whereClause: Prisma.ProductsWhereInput = { isDeleted: false };

    const offset = (page - 1) * limit;

    if (filters?.gender != undefined) {
      whereClause.gender = { equals: filters.gender };
    }

    const product = await prisma.products.findMany({
      select: productMiniSelectFields,
      take: limit,
      where: whereClause,
      skip: offset,
    });

    const totalProducts = await prisma.products.count({ where: whereClause });

    const totalPages = Math.ceil(totalProducts / limit);

    return product;
  };

  getFilterTypes = async (): Promise<IFilterTypes> => {
    const productCategories = await prisma.categories.findMany({
      select: { categoryName: true },
    });

    const filterTypes = {
      gender: ["Men", "Women"],
      categories: productCategories?.map((category) => category.categoryName),
    };

    return filterTypes;
  };

  getFilteredProducts = async ({
    page,
    limit,
    filters = { isDeleted: "false" },
  }: IFilterProduct): Promise<IFilterProducts> => {
    console.log(page, typeof limit);

    // const pageLimit = typeof limit === "string" && parseInt(limit);
    // console.log(typeof limit, "hasa");

    const offset = (page - 1) * limit;

    let whereClause: Prisma.ProductsWhereInput = {
      isDeleted: filters?.isDeleted === "true" ? true : false,
    };

    console.log(Boolean(filters?.isDeleted), "ajsjas");

    console.log(filters, "asajsjajhsajh");

    if (filters?.gender != undefined) {
      whereClause.gender = { equals: filters.gender };
    }

    if (filters?.categories?.length > 0 && filters?.categories !== undefined) {
      console.log("sasa");

      whereClause.category = {
        categoryName: {
          in: filters.categories,
        },
      };
    }

    if (filters?.searchName != undefined) {
      whereClause.name = { contains: filters?.searchName, mode: "insensitive" };
    }

    if (filters?.colors?.length > 0 && filters?.colors) {
      whereClause.variants = {
        some: {
          color: {
            in: filters.colors,
          },
        },
      };
    }

    const products = await prisma.products.findMany({
      skip: offset,
      take: limit,
      where: whereClause,
      select: productMiniSelectFields,
      orderBy: [{ createdAt: "asc" }],
    });

    const totalProducts = await prisma.products.count({ where: whereClause });

    const totalPages = Math.ceil(totalProducts / limit);

    return { products, currentPage: page, totalPages };
  };

  updateProduct = async (
    productDTO: IProductDTO,
    productId: string
  ): Promise<boolean> => {
    const updatedItem = await prisma.products.update({
      where: { productId },
      data: {
        categoryId: productDTO.categoryId,
        description: productDTO.description,
        gender: productDTO.gender,
        name: productDTO.name,
        price: parseFloat(productDTO.price),
      },
    });

    return !!updatedItem;
  };

  updateProductImages = async (
    variant: IProductPictureDTO,
    files: string[]
  ) => {
    if (variant) {
      await Promise.all(
        variant.images.map(async (url) => {
          const images = await prisma.productImages.findMany({
            where: {
              productImageId: url.productImageId,
            },
          });

          if (images.length === 0) {
            throw new CustomError(
              `No images found for productImageId: ${url.productImageId}`,
              404
            );
          }

          // Map over the images and delete them from Cloudinary
          const imageDeletionPromises = images.map(async (image) => {
            return deleteImageCloudinary(image.url);
          });

          // Wait for all deletions to complete
          return Promise.all(imageDeletionPromises);
        })
      );

      await prisma.productImages.deleteMany({
        where: {
          variantId: variant.variantId,
          productImageId: {
            in: variant.images.map((image) => image.productImageId),
          },
        },
      });
    }

    if (files.length > 0 && files) {
      await prisma.productImages.createMany({
        data: files.map((image) => ({
          url: image,
          variantId: variant.variantId,
        })),
      });
    }
  };

  updateProductSize = async (
    { sizeId, stock }: ISizeUpdateDTO,
    variantId: string
  ) => {
    const updatedSize = await prisma.productSizes.update({
      where: { sizeId, variantId },
      data: { stock: stock },
    });
    return !!updatedSize;
  };

  softDeleteProduct = async (productId: string) => {
    const product = await prisma.products.update({
      where: { productId },
      data: { isDeleted: true },
    });

    return !!product;
  };

  checkProductWishList = async (productId: string, userId: string) => {
    const product = await prisma.wishListItem.findFirst({
      where: { productId, userId },
    });

    return !!product;
  };

  addProductWishList = async (productId: string, userId: string) => {
    const product = await prisma.wishListItem.create({
      data: { userId, productId },
    });

    return !!product;
  };

  deleteProductWishList = async (productId: string, userId: string) => {
    const product = await prisma.wishListItem.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return !!product;
  };

  addProductReviews = async (
    productId: string,
    userId: string,
    review: IProductReviewDTO
  ) => {
    const product = await prisma.review.create({
      data: { productId, userId, ...review },
    });

    return !!product;
  };

  getWishlist = async (userId: string): Promise<IWishListProduct[]> => {
    return await prisma.wishListItem.findMany({
      where: { userId },
      select: {
        wishListId: true,
        product: { select: productMiniSelectFields },
      },
    });
  };
}

export const productService = new ProductService();
