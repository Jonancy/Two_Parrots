export interface ICategory {
  categoryId: string;
  categoryName: string;
}

export interface IProduct {
  productId: string;
  name: string;
  description: string;
  price: number;
  gender: "Men" | "Women";
  category: ICategory;
  isDeleted: boolean;
  view: boolean;
  variants: IVariant[];
  createdAt: Date;
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
