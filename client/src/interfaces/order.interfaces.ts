export interface IOrderItemsDTO {
  productId: string;
  variantId: string;
  sizeId: string;
  quantity: number;
  price: number;
}

export interface IOrderDTO {
  userName: string;
  email: string;
  totalPrice: number;
  phoneNumber: string;
  location: string;
  orderItems: IOrderItemsDTO[];
}
