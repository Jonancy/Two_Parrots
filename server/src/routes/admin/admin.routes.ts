import { Router } from "express";
import { categoryRoutes } from "./category.routes";
import { adminProductRoutes } from "./product.routes";
import { adminOrderRoutes } from "./order.routes";

export const adminRoutes = Router();

adminRoutes.use("/categorys", categoryRoutes);
adminRoutes.use("/products", adminProductRoutes);
adminRoutes.use("/orders", adminOrderRoutes);
