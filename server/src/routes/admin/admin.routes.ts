import { Router } from "express";
import { categoryRoutes } from "./category.routes";
import { adminProductRoutes } from "./product.routes";
import { adminOrderRoutes } from "./order.routes";
import { successHandler } from "../../handlers/success/successHandler";

export const adminRoutes = Router();

adminRoutes.use("/categorys", categoryRoutes);
adminRoutes.use("/products", adminProductRoutes);
adminRoutes.use("/orders", adminOrderRoutes);
adminRoutes.use("/dashboard", (req, res, next) => {
  successHandler(res, 201, null, "Authorized");
});
