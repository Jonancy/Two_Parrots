import { Fragment, ReactComponentElement, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { AdminChecker, AuthChecker, AuthorChecker } from "./AuthChecker.routes";
import { allRoutes } from "./all.routes";
import Loading from "@/pages/Loading";

function MainWrapper({
  route,
  children,
}: {
  route: {
    id: string;
    path: string;
    component: React.FC;
    hasHomeLayout: boolean;
    hasAdminLayout: boolean;
    requiredAuth: boolean;
    requireAuthor: boolean;
    layout: ReactComponentElement;
  };
  children: React.ReactNode;
}) {
  const LayoutWrpper = route?.layout ?? Fragment;
  const PrivateWrapper = route?.requiredAuth ? Fragment : Fragment;
  const AdminWrapper = route?.hasAdminLayout ? Fragment : Fragment;
  const AuthorWrapper = route?.requireAuthor ? Fragment : Fragment;

  return (
    <PrivateWrapper>
      <AdminWrapper>
        <AuthorWrapper>
          <LayoutWrpper>{children}</LayoutWrpper>
        </AuthorWrapper>
      </AdminWrapper>
    </PrivateWrapper>
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
                    <route.component />
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
