import { Gender, OrderStatus, PaymentMethod } from "@prisma/client";

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

export interface IOrderStatusUpdate {
  status: OrderStatus;
  orderId: string;
  pidx: string;
  paymentMethod: PaymentMethod;
}

export interface IOrderTableDetails {
  orderId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  phoneNumber: number;
  location: string;
  createdAt: Date;
  orderItems: {
    quantity: number;
    product: {
      gender: Gender;
    };
    variant: {
      images: {
        url: string;
      }[];
    };
    size: {
      size: string;
    };
  }[];
}
