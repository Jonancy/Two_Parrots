export interface IOrderItemDTO {
  productId: string;
  variantId: string;
  sizeId: string;
  quantity: number;
  price: number;
}

export interface IOrderDTO {
  userId: string;
  totalPrice: number;
  phoneNumber: string;
  location: string;
  orderItems: IOrderItemDTO[];
}
