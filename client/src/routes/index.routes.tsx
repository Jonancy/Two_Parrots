import { Fragment, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { allRoutes } from "./all.routes";
import { IMainRoutes } from "@/interfaces/routes.interfaces";
import HomeLayout from "@/layout/client/homeLayout";
import AdminDashboardLayout from "@/layout/admin/adminDashboardLayout";
import AdminAuthChecker from "./wrappers/adminAuthChecker";
import ErrorBoundary from "@/utils/errorBoundary";
import Loader from "@/components/fallback/loader";
import ErrorFallback from "@/components/fallback/errorFallback";

function MainWrapper({ route, children }: IMainRoutes) {
  const HomeLayoutWrapper = route?.hasHomeLayout ? HomeLayout : Fragment;
  const AdminLayoutWrapper = route?.hasAdminLayout
    ? AdminDashboardLayout
    : Fragment;
  const AdminLayoutChecker = route?.hasAuth ? AdminAuthChecker : Fragment;

  return (
    <AdminLayoutChecker>
      <AdminLayoutWrapper>
        <HomeLayoutWrapper>{children}</HomeLayoutWrapper>
      </AdminLayoutWrapper>
    </AdminLayoutChecker>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallback={<ErrorFallback />}>
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
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}
