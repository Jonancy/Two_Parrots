import { Fragment, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { allRoutes } from "./all.routes";
import Loading from "@/pages/Loading";
import { IMainRoutes } from "@/interfaces/routes.interfaces";
import HomeLayout from "@/layout/client/homeLayout";
import AdminDashboardLayout from "@/layout/admin/adminDashboardLayout";

function MainWrapper({ route, children }: IMainRoutes) {
  const HomeLayoutWrapper = route?.hasHomeLayout ? HomeLayout : Fragment;
  const AdminLayoutWrapper = route?.hasAdminLayout
    ? AdminDashboardLayout
    : Fragment;

  return (
    <AdminLayoutWrapper>
      <HomeLayoutWrapper>{children}</HomeLayoutWrapper>
    </AdminLayoutWrapper>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {allRoutes.map((route) => {
            return (
              <Route
                key={route.id}
                path={route.path}
                element={
                  <MainWrapper route={route}>
                    <route.element />
                  </MainWrapper>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
