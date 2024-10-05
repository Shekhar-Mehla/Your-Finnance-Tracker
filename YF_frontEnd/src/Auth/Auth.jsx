import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CentralState } from "../context/ContextApi.jsx";
import { getUserProfile } from "../AxiousHelper/axious.js";

const Auth = ({ children }) => {
  const jwt = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fethcUser = async () => {
    try {
      const result = await getUserProfile();
      return result;
    } catch (error) {}
  };

  useEffect(() => {
    const getUser = async () => {
      const result = await fethcUser();
      const { user } = await result;
      if (user?._id) {
        setIsAuthenticated(true);
      }
    };

    getUser();
  }, []);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default Auth;
