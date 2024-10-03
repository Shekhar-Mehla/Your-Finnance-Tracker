import React from "react";
import Nav from "./Nav.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
