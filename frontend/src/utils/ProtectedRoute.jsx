import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, redirectTo = "/", role }) => {
  const { authUser } = useAuth();
  if (!authUser || authUser?.role !== role) {
    if (authUser?.role)
      return <Navigate to={`/${authUser.role}/dashboard`} replace />;
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
