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

export const orderSelectFields = {
  orderId: true,
  status: true,
  totalPrice: true,
  userName: true,
  email: true,
  createdAt: true,
  orderItems: {
    select: {
      orderItemId: true,
      price: true,
      createdAt: true,
      quantity: true,
      product: true,
      size: true,
      variant: true,
      orderId: true,
    },
  },
};

export const tableOrderSelectFields = {
  orderId: true,
  location: true,
  status: true,
  createdAt: true,
  paymentMethod: true,
  totalPrice: true,
  phoneNumber: true,
  orderItems: {
    select: {
      quantity: true,
      product: { select: { gender: true } },
      variant: { select: { images: { select: { url: true } } } },
      size: { select: { size: true } },
    },
  },
};
