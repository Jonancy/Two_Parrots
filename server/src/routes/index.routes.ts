import { Router } from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";
import { productRoutes } from "./product.routes";
import { categoryRoutes } from "./category.routes";

const indexRoutes = Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/auth", authRoutes);
indexRoutes.use("/product", productRoutes);
indexRoutes.use("/category", categoryRoutes);
export default indexRoutes;
