export interface ICategory {
  categoryId: string;
  categoryName: string;
}

export interface IProduct {
  productId: string;
  name: string;
  description: string;
  price: number;
  gender: string;
  category: ICategory;
  variants: IVariant[];
  createdAt: string;
}

export interface IVariant {
  variantId: string;
  color: string;
  sizes: ISize[];
  images: IImage[];
}

export interface ISize {
  sizeId: string;
  size: string;
  stock: number;
}

export interface IImage {
  productImageId: string;
  url: string;
}

export interface ICartItem {
  productId: string;
  name: string;
  image: string;
  variantId: string;
  color: string;
  size: ISize;
  quantity: number;
  price: number;
}
