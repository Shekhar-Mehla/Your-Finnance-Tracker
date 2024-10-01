import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CentralState } from "../context/ContextApi.jsx";

const Auth = ({ children }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(CentralState);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default Auth;
