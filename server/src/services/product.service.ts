import { Prisma, Products } from "@prisma/client";
import { prisma } from "../..";
import {
  IFilterProduct,
  IFilterProducts,
  IFilterTypes,
  IProduct,
  ISize,
  IVariant,
} from "../interfaces/product.interfaces";
import {
  IProductDTO,
  IProductPictureDTO,
  ISizeUpdateDTO,
} from "../dtos/product.dto";
import { productSelectFields } from "../utils/prismaSelectQueries";
import CustomError from "../handlers/errors/customError";

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

  getAllProducts = async (): Promise<IProduct[]> => {
    const product = await prisma.products.findMany({
      select: productSelectFields,
    });

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
    filters,
  }: IFilterProduct): Promise<IFilterProducts> => {
    const offset = (page - 1) * limit;

    let whereClause: Prisma.ProductsWhereInput = {};
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
      select: productSelectFields,
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
      const updateImage = await prisma.productImages.deleteMany({
        where: {
          variantId: variant.variantId,
          productImageId: {
            in: variant.images.map((image) => image.productImageId),
          },
        },
      });

      // if (!updateImage) {
      //   throw new CustomError("Deletion of the picture failed", 400);
      // }
    }

    if (files.length > 0 && files) {
      const newImages = await prisma.productImages.createMany({
        data: files.map((image) => ({
          url: image,
          variantId: variant.variantId,
        })),
      });

      // if (!newImages) {
      //   throw new CustomError("Addition of the picture failed", 400);
      // }
    }

    return true;
  };

  updateProductSize = async (
    { sizeId, stock }: ISizeUpdateDTO,
    variantId: string
  ) => {
    const updatedSize = await prisma.productSizes.update({
      where: { sizeId: sizeId, variantId: variantId },
      data: { stock: stock },
    });
    return !!updatedSize;
  };
}

export const productService = new ProductService();
