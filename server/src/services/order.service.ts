import { prisma } from "../..";
import { IOrderDTO } from "../interfaces/order.interfaces";
import { userSelectFields } from "../utils/prismaSelectQueries";

class OrderService {
  createOrder = async (orderInput: IOrderDTO) => {
    const order = await prisma.orders.create({
      data: {
        ...orderInput,
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
        user: { select: userSelectFields },
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
}

export const orderService = new OrderService();
