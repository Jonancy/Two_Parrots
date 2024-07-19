import { Orders, OrderStatus, PaymentMethod } from "@prisma/client";
import { prisma } from "../..";
import { IOrderDTO, IOrderStatusUpdate } from "../interfaces/order.interfaces";
import { userSelectFields } from "../utils/prismaSelectQueries";

class OrderService {
  createOrder = async (orderInput: IOrderDTO) => {
    const { paymentMethod, ...orderDetails } = orderInput;

    const order = await prisma.orders.create({
      data: {
        ...orderDetails,
        orderItems: {
          create: orderInput.orderItems.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            sizeId: item.sizeId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return order;
  };

  getAllOrders = async () => {
    const orders = await prisma.orders.findMany({
      select: {
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
      },
    });
    return orders;
  };

  //!For checking the order for now
  getSpecificOrder = async (id: string): Promise<Orders> => {
    const order = await prisma.orders.findFirst({
      where: { orderId: id, status: "Pending" },
    });

    return order;
  };

  updateOrderStatus = async (
    updateDTO: IOrderStatusUpdate
  ): Promise<boolean> => {
    const { orderId, paymentMethod, pidx, status } = updateDTO;
    const update = await prisma.orders.update({
      where: { orderId },
      data: { status, pidx, paymentMethod },
    });

    return !!update;
  };
}

export const orderService = new OrderService();
