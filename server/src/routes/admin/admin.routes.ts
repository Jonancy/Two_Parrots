import { Router } from "express";
import { categoryRoutes } from "./category.routes";
import { adminProductRoutes } from "./product.routes";
import { adminOrderRoutes } from "./order.routes";

export const adminRoutes = Router();

adminRoutes.use("/category", categoryRoutes);
adminRoutes.use("/product", adminProductRoutes);
adminRoutes.use("/order", adminOrderRoutes);
