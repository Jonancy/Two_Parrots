import { Products } from "@prisma/client";
import { prisma } from "../..";
import {
  ICategory,
  IProduct,
  ISize,
  IVariant,
} from "../interfaces/product.interfaces";
import { IProductDTO } from "../dtos/product.dto";

class ProductService {
  addCategories = async (categoryDTO: ICategory): Promise<boolean> => {
    const category = await prisma.categories.create({
      data: categoryDTO,
    });

    return !!category; //! Yele chai boolean value return garcha like if the category is successfully instered then the variable ma chai object aucha and having an object means the variable is truthly and falsy
  };

  getCategoryById = async (id: string): Promise<ICategory | null> => {
    const category = await prisma.categories.findFirst({
      where: { categoryId: id },
    });

    return category;
  };

  checkCategoryExistence = async (name: string): Promise<ICategory | null> => {
    //!Using case insensetive
    const category = await prisma.categories.findFirst({
      where: { categoryName: { equals: name, mode: "insensitive" } },
    });

    return category;
  };

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

  getAllProducts = async () => {
    const product = await prisma.products.findMany({
      // where: { view: { not: false }, isDeleted: { not: false } },
      select: {
        name: true,
        gender: true,
        isDeleted: true,
        view: true,
        price: true,
        description: true,
        createdAt: true,
        category: {
          select: { categoryName: true },
        },
        variants: {
          select: {
            color: true,
            images: { select: { url: true } },
            sizes: { select: { size: true, stock: true } },
          },
        },
      },
    });

    return product;
  };
}

export const productService = new ProductService();
