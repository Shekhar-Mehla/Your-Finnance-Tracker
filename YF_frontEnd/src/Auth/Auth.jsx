import React from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const isLogged_in = false;
  return isLogged_in ? children : <Navigate to="/login" />;
};

export default Auth;
