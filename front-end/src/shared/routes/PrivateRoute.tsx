import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

interface PrivateRouteProps {
  children: ReactElement;
  requiredRole?: "admin" | "user";
}

// Place this file next to AppRoutes.tsx (e.g. src/shared/routes/PrivateRoute.tsx)
const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Logged in, but wrong role (e.g. a regular user hitting an /admin route)
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
