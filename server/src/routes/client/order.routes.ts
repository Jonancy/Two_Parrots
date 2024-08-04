import { Router } from "express";
import { orderController } from "../../controllers/order.controller";

export const userOrderRoutes = Router();

userOrderRoutes.post("/createOrder", orderController.createOrder);
userOrderRoutes.post("/payment", orderController.finalPayment);

userOrderRoutes.get("/getAllOrderDetails", orderController.getAllOrderDetails);
