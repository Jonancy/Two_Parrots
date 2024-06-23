import { Router } from "express";
import { orderController } from "../../controllers/order.controller";

export const userOrderRoutes = Router();

userOrderRoutes.post("/order/:userId", orderController.createOrder);

userOrderRoutes.get(
  "/order/getAllOrderDetails",
  orderController.getAllOrderDetails
);
