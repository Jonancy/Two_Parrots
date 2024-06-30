import { IEsewaDecodeResponse } from "./esewa.interfaces";

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

export interface IFinalPayment {
  pidx: string;
  orderId: string;
  status: string;
  encodedData: IEsewaDecodeResponse;
  method: "Esewa" | "Khalti";
}
