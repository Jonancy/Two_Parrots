import { IImage } from "@/interfaces/product.interfaces";

export interface IProductDTO {
  name: string;
  description: string;
  price: string;
  gender: string;
  categoryId: string;
}

export type IProductPictureUpdateDTO = {
  variantId: string;
  images: { productImageId?: string; url?: File | null }[];
};
