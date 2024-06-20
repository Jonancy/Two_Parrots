import { Products } from "@prisma/client";
import { prisma } from "../..";
import { ICategory, IProduct } from "../interfaces/product.interfaces";

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

  createProduct = async (data: IProduct): Promise<Products | null> => {
    const product = await prisma.products.create({
      data: {
        ...data,
        variants: {
          create: data.variants.map((variant) => ({
            ...variant,
            sizes: {
              create: variant.sizes,
            },
            images: {
              create: variant.images,
            },
          })),
        },
      },
    });

    return product;
  };
}

export const productService = new ProductService();
