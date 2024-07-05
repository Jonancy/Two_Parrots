import { adminRoutes } from "./admin.routes";
import { authRoutes } from "./auth.routes";
import { errorRoutes } from "./error.routes";

import { userRoutes } from "./user.routes";

export const allRoutes = [
  ...userRoutes,
  ...adminRoutes,
  ...errorRoutes,
  ...authRoutes,
];
