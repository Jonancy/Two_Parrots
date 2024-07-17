export interface IOrderItemDTO {
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
  phoneNumber: number;
  location: string;
  paymentMethod: "Khalti" | "Esewa";
  orderItems: IOrderItemDTO[];
}
