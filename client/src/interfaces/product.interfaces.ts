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
  wishlist?: IWishList[];
  createdAt: string;
}

export interface IVariant {
  variantId: string;
  color: string;
  sizes: ISize[];
  images: IImage[];
}

export interface IWishList {
  userId: string;
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
  products: IMiniProduct[];
  totalPages: number;
  currentPage: number;
}

//!For req purposes
export interface IFilterProduct {
  page?: number;
  limit?: number;
  isEnabled?: boolean;
  filters?: {
    gender?: string;
    categories?: string[];
    colors?: string[];
    isDeleted?: boolean;
    searchName?: string;
  };
}

export interface TProductCard {
  id: string;
  name: string;
  image: string;
  price: number;
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
