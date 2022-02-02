import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute() {
  //{ component: Component, ...rest }
  const { currentUser } = useAuth();
  // console.log(currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
