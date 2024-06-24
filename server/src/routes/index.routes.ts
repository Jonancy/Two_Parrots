import { Router } from "express";
import { userRoutes } from "./client/user.routes";
import { authRoutes } from "./client/auth.routes";
import { adminRoutes } from "./admin/admin.routes";
import { AdminAuthRole } from "../middlewares/auth/roleAuth.middleware";

const indexRoutes = Router();

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/auth", authRoutes);
indexRoutes.use("/admin", adminRoutes);
export default indexRoutes;
