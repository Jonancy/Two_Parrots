import { NextFunction, Request, Response } from "express-serve-static-core";
import { orderService } from "../services/order.service";
import { IOrderDTO, IOrderItemDTO } from "../interfaces/order.interfaces";
import CustomError from "../handlers/errors/customError";
import { successHandler } from "../handlers/success/successHandler";
import axios from "axios";
import {
  IFinalPaymentPayload,
  IKhaltiCallBackResponse,
  IKhaltiInitialPayload,
} from "../interfaces/khalti.interfaces";
import { callKhalti, handleKhaltiCallback } from "./khalti.controller";
import { createSignature } from "../utils/esewaHash";
import { handleEsewaSuccess } from "./esewa.controller";

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
      console.log(order, "a");
      const price = order.totalPrice * 100;
      console.log(price);

      // const payLoadData: IKhaltiInitialPayload = {
      //   return_url: "http://localhost:5000/paymentSuccess",
      //   website_url: "http://localhost:5000",
      //   amount: price,
      //   purchase_order_id: order.orderId,
      //   purchase_order_name: order.userName,
      // };

      // await callKhalti(payLoadData)(req, res);
      // console.log("lla");
      const signature = createSignature(
        `total_amount=${order.totalPrice},transaction_uuid=${order.orderId},product_code=EPAYTEST`
      );
      const formData = {
        amount: order.totalPrice,
        failure_url: "http://localhost:5000",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:5000/paymentSuccess",
        tax_amount: "0",
        total_amount: order.totalPrice,
        transaction_uuid: order.orderId,
      };

      successHandler(res, 201, formData, "Order Created Sucessfully");
    } catch (e) {
      console.log(e);

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

  finalPayment = async (
    req: Request<{}, {}, IFinalPaymentPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { status, orderId, pidx, encodedData, method } = req.body;
      console.log(encodedData, "as");
      const orderID = orderId ? orderId : encodedData.transaction_uuid;

      const checkOrder = await orderService.getSpecificOrder(orderID);

      if (!checkOrder) {
        throw new CustomError("Order not found", 404);
      }

      // if (status != "Completed") {
      //   throw new CustomError("Error Processing Khalti", 400);
      // }
      const data = await handleEsewaSuccess(encodedData, res, next);

      // const checkKhalti: IKhaltiCallBackResponse = await handleKhaltiCallback(
      //   pidx,
      //   next
      // );

      // if (checkKhalti.status !== "Completed") {
      //   throw new CustomError("Payment not completed", 400);
      // }

      console.log("s");

      //  const updateOrder = await orderService.updateOrderStatus(
      //   "Confirmed",
      //   orderId,
      //   pidx,
      //   "Esewa"
      // );

      // if (!updateOrder) {
      //   throw new CustomError("Updating order failed", 500);
      // }

      // successHandler(res, 201, updateOrder, "Order confirmed successfully");
    } catch (e) {
      next(e);
    }
  };
}

export const orderController = new OrderController();
