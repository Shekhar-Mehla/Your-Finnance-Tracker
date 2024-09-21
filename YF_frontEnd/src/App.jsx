import React from "react";
import Button from "react-bootstrap/Button";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";
const App = () => {
  return (
    <>
      app
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="transaction" element={<Transaction />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default App;
