import { Router } from "express";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";

const indexRoutes = Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/auth", authRoutes);
export default indexRoutes;
