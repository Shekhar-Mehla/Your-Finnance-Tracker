import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Auth from "./Auth/Auth";
import Layout from "./Component/Layout";
// pages
import Register from "./pages/Register";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";

import { autoLogin } from "./Utility/Autologin";
import { userdata } from "./context/ContextApi";

const App = () => {
  const { user, setUser } = userdata();

  useEffect(() => {
    !user?._id && autoLoginUser();
  }, [user._id]);

  const autoLoginUser = async () => {
    const user = await autoLogin();
    if (user?._id) {
      return setUser(user);
    }
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Login></Login>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="register" element={<Register></Register>}></Route>
          <Route
            path="dashboard"
            element={
              <Auth>
                <Dashboard></Dashboard>
              </Auth>
            }
          ></Route>
          <Route
            path="transactions"
            element={
              <Auth>
                <Transaction></Transaction>
              </Auth>
            }
          ></Route>
        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default App;
