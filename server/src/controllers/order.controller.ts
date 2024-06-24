import { NextFunction, Request, Response } from "express-serve-static-core";
import { orderService } from "../services/order.service";
import { IOrderDTO, IOrderItemDTO } from "../interfaces/order.interfaces";
import CustomError from "../handlers/errors/customError";
import { successHandler } from "../handlers/success/successHandler";

class OrderController {
  createOrder = async (
    req: Request<{}, {}, IOrderDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const orderDTO = req.body;
      console.log(orderDTO);

      const totalPrice = orderDTO.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const orderMain: IOrderDTO = {
        ...orderDTO,
        totalPrice,
      };
      const order = await orderService.createOrder(orderMain);

      if (!order) {
        throw new CustomError("Order unsuccessful", 500);
      }

      successHandler(res, 201, order, "Order success");
    } catch (e) {
      next(e);
    }
  };

  getAllOrderDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allOrders = await orderService.getAllOrders();

      successHandler(res, 200, allOrders, "All orders");
    } catch (e) {
      next(e);
    }
  };
}

export const orderController = new OrderController();
