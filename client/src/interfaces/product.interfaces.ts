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
  productImageId?: string;
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

export interface IFilterTypes {
  gender: string[];
  categories: string[];
}

//!For res purposes
export interface IFilterProducts {
  products: IProduct[];
  totalPages: number;
  currentPage: number;
}

//!For req purposes
export interface IFilterProduct {
  page?: number;
  limit?: number;
  filters?: {
    gender?: string;
    categories?: string[];
    colors?: string[];
    isDeleted?: boolean;
  };
}

export interface TProductCard {
  id: string;
  name: string;
  image: string;
  price: number;
}
