/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorBoundary from "src/pages/Error";

// lazy imports
const Login = lazy(() => import(`src/components/Auth/Login`));
const Layout = lazy(() => import(`src/root/MainRoot`));
const Main = lazy(() => import(`src/pages/Error/Main`));

// Access by roles
const RoleAccess = ({ children }) => {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
};

// routes
export const routes = createBrowserRouter([
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
