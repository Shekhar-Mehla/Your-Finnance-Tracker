import React from "react";
import Button from "react-bootstrap/Button";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Auth from "./Auth/Auth";

import Register from "./pages/Register";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register></Register>} />
        <Route
          path="dashboard"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
        <Route
          path="transaction"
          element={
            <Auth>
              <Transaction />
            </Auth>
          }
        />
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default App;
