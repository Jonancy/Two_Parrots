import { adminRoutes } from "./admin/admin.routes";
import { authRoutes } from "./auth/auth.routes";
import { errorRoutes } from "./error/error.routes";

import { userRoutes } from "./client/user.routes";

export const allRoutes = [
  ...userRoutes,
  ...adminRoutes,
  ...errorRoutes,
  ...authRoutes,
];
