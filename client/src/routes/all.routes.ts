import { adminRoutes } from "./admin.routes";

import { userRoutes } from "./user.routes";

export const allRoutes = [...userRoutes,...adminRoutes];