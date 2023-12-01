import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorBoundary from "src/pages/Error";

// lazy imports
export const Login = lazy(() => import(`src/components/Auth/Login`));
export const Layout = lazy(() => import(`src/root/MainRoot`));
export const Main = lazy(() => import(`src/pages/Error/Main`));

// Access by roles
const RoleAccess = ({ children }) => {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
};

// routes
export const Routes = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <RoleAccess>
        <Layout />
      </RoleAccess>
    ),
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);
