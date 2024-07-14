import { Products } from "@prisma/client";
import { prisma } from "../..";
import { IProduct, ISize, IVariant } from "../interfaces/product.interfaces";
import { IProductDTO } from "../dtos/product.dto";
import { productSelectFields } from "../utils/prismaSelectQueries";

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
}

export const productService = new ProductService();
