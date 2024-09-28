import React from "react";
import { imges } from "../assets/assets.js";
import Quotes from "../Component/Quotes.jsx";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <img src={imges[0]} />
      <Quotes></Quotes>
    </div>
  );
};

export default Dashboard;
