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
import { IEsewaDecodeResponse } from "../interfaces/esewa.interfaces";

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

      if (orderMain.paymentMethod === "Khalti") {
        const payLoadData: IKhaltiInitialPayload = {
          return_url: "http://localhost:5000/payment-success",
          website_url: "http://localhost:5000",
          amount: price,
          purchase_order_id: order.orderId,
          purchase_order_name: order.userName,
        };

        return await callKhalti(payLoadData)(req, res, next);
      } else {
        const signature = createSignature(
          `total_amount=${order.totalPrice},transaction_uuid=${order.orderId},product_code=EPAYTEST`
        );
        console.log(signature, "ajsjsjsjsjsj");

        const formData = {
          amount: order.totalPrice,
          failure_url: "http://localhost:5000",
          product_delivery_charge: "0",
          product_service_charge: "0",
          product_code: "EPAYTEST",
          signature: signature,
          signed_field_names: "total_amount,transaction_uuid,product_code",
          success_url: "http://localhost:5000/payment-success",
          tax_amount: "0",
          total_amount: order.totalPrice,
          transaction_uuid: order.orderId,
        };
        return successHandler(res, 201, formData, "Order Created Sucessfully");
      }
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
      const userDetails = req.user;

      const allOrders = await orderService.getSpecificUsersOrders(
        userDetails.email
      );

      successHandler(res, 200, allOrders, "All orders details of user");
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
      console.log(req.body);

      if (method === "Esewa") {
        const decodedData: IEsewaDecodeResponse = JSON.parse(
          Buffer.from(encodedData, "base64").toString("utf-8")
        );
        console.log(decodedData, "asjajsasewewewewe");

        const orderID = orderId ? orderId : decodedData.transaction_uuid;
        console.log(orderID, "askas");

        const checkOrder = await orderService.getSpecificOrder(orderID);

        if (!checkOrder) {
          throw new CustomError("Order not found", 404);
        }

        const data = await handleEsewaSuccess(decodedData, res, next);

        if (data.status !== "COMPLETE") {
          throw new CustomError("Esewa payment unsuccessful lol", 400);
        }

        console.log(data, "final esewa");

        //!Using the transaction code as the pidx
        let pidx = decodedData.transaction_code;
        console.log(orderID, "new code");

        console.log(pidx, "new code");

        const updateOrder = await orderService.updateOrderStatus({
          status: "Confirmed",
          orderId: orderID,
          pidx,
          paymentMethod: "Esewa",
        });

        if (!updateOrder) {
          throw new CustomError("Updating order failed", 500);
        }
      } else {
        if (status != "Completed") {
          throw new CustomError("Error Processing Khalti", 400);
        }

        const checkKhalti: IKhaltiCallBackResponse = await handleKhaltiCallback(
          pidx,
          next
        );

        if (checkKhalti.status !== "Completed") {
          throw new CustomError("Payment not completed", 400);
        }
        const updateOrder = await orderService.updateOrderStatus({
          status: "Confirmed",
          orderId,
          pidx,
          paymentMethod: "Khalti",
        });

        if (!updateOrder) {
          throw new CustomError("Updating order failed", 500);
        }
        console.log(updateOrder, "jasas");
      }

      successHandler(res, 201, null, "Order confirmed successfully");
    } catch (e) {
      next(e);
    }
  };
}

export const orderController = new OrderController();
