import { IRouteTypes } from "@/interfaces/routes.interfaces";
import Error404 from "@/pages/error/error404";

export const errorRoutes: IRouteTypes[] = [
  {
    id: "error404",
    element: Error404,
    path: "*",
  },
];
