//! Tei shortcuts for selecting the fields tei details taneko tanei garnu vanda yei thik
export const userSelectFields = {
  id: true,
  name: true,
  email: true,
  picture: true,
};

export const productSelectFields = {
  // where: { view: { not: false }, isDeleted: { not: false } },
  productId: true,
  name: true,
  gender: true,
  isDeleted: true,
  view: true,
  price: true,
  description: true,
  createdAt: true,
  category: {
    select: { categoryId: true, categoryName: true },
  },
  variants: {
    select: {
      variantId: true,
      color: true,
      images: { select: { productImageId: true, url: true } },
      sizes: { select: { sizeId: true, size: true, stock: true } },
    },
  },
};
