import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to={role === "admin" ? "/admin/login" : "/agent/login"} state={{ from: location }} />;
  if (role && user.userType !== role) return <Navigate to="/" />;
  return children;
}
