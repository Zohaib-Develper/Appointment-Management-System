import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
