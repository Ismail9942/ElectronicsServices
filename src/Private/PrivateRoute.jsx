import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../component/Loading";
import UseAuth from "../auth/UseAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();

  const location = useLocation();

  if (loading) return <Loading />;
  if (user) return children;

  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
