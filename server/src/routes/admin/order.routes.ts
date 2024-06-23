import { Router } from "express";
import { orderController } from "../../controllers/order.controller";

export const adminOrderRoutes = Router();

// adminOrderRoutes.post("/:userId", orderController.createOrder);

adminOrderRoutes.get("/getAllOrderDetails", orderController.getAllOrderDetails);
