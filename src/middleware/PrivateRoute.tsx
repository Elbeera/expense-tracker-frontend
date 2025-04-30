// src/components/PrivateRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactElement } from "react";

interface PrivateRouteProps {
  element: ReactElement;
  path?: string; // path is now optional since we don't use it internally
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const token = Cookies.get("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default PrivateRoute;
