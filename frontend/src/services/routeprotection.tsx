import React from "react";
import { Navigate } from "react-router-dom";
import { getLocalStorageUser } from "../utils/localStorageUtils.ts";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getLocalStorageUser() !== null; 

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
