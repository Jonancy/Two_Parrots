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

export interface IFilterTypes {
  gender: string[];
  categories: string[];
}

export interface IFilterProduct {
  page: number;
  limit?: number;
  filters?: {
    gender?: "Men" | "Women";
    categories?: string[];
    colors?: string[];
    isDeleted?: string;
    searchName?: string;
  };
}

export interface IFilterProducts {
  products: IMiniProduct[];
  totalPages: number;
  currentPage: number;
}
export interface IProductReviews {
  reviewId: string;
  comment: string;
  createdAt: Date;
  user: {
    name: string;
    userId: string;
    picture: string;
  };
}

export interface IMiniProduct {
  productId: string;
  price: number;
  name: string;
  gender: "Men" | "Women";
  category: {
    categoryId: string;
    categoryName: string;
  };
  variants: {
    variantId: string;
    color: string;
    images: {
      productImageId: string;
      url: string;
    }[];
  }[];
}

export interface IWishListProduct {
  wishListId: string;
  product: IMiniProduct;
}
