import { Router } from "express";
import { userRoutes } from "./client/user.routes";
import { authRoutes } from "./auth/auth.routes";
import { adminRoutes } from "./admin/admin.routes";
import { AdminAuthRole } from "../middlewares/auth/roleAuth.middleware";

const indexRoutes = Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/auth", authRoutes);
indexRoutes.use("/admin", AdminAuthRole(), adminRoutes);
export default indexRoutes;
