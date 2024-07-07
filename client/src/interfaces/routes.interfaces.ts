import { LazyExoticComponent } from "react";

export interface IRouteTypes {
  id: string;
  path: string;
  element: React.ComponentType;
  hasHomeLayout?: boolean;
  hasAdminLayout?: boolean;
  hasAuth?: boolean;
  layout?: LazyExoticComponent<any>;
}
export interface IMainRoutes {
  route: IRouteTypes;
  children: React.ReactNode;
}
