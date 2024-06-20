import { Router } from "express";
import { userRoutes } from "./client/user.routes";
import { authRoutes } from "./client/auth.routes";
import { productRoutes } from "./admin/product.routes";
import { categoryRoutes } from "./admin/category.routes";

const indexRoutes = Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/auth", authRoutes);
indexRoutes.use("/product", productRoutes);
indexRoutes.use("/category", categoryRoutes);
export default indexRoutes;
