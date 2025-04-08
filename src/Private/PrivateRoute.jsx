import React from "react";
import { useAuth } from "../auth/AtuhProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../component/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) return <Loading />;
  if (user) return children;

  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
