export interface ICategory {
  categoryId: string;
  categoryName: string;
}

export interface IProduct {
  name: string;
  description: string;
  price: string;
  gender: "Men" | "Women";
  categoryId: string;
  variants: IVariant[];
}

export interface IVariant {
  color: string;
  sizes: ISize[];
  images: IImage[];
}

export interface ISize {
  size: string;
  stock: number;
}

export interface IImage {
  url: string;
}
