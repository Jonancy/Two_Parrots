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

export interface ISizeUpdateDTO {
  sizeId: string;
  stock: number;
}

export interface IProductReviewDTO {
  comment: string;
  rating: number;
}
