import { createContext, useContext, useEffect, useState } from "react";
import { getTranscation } from "../AxiousHelper/axious.js";
import { useLocation, useNavigate } from "react-router-dom";

export const CentralState = createContext();

export const CentralstateProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // toggle function to show and hide the transaction form on add transaction button click

  const toggle = () => {
    show ? setShow(false) : setShow(true);
  };

  // this useeffect hook responsible to navigate the user once user is authenticated
  const goToPage = location?.state?.from?.pathname || location.pathname;

  console.log(goToPage);

  useEffect(() => {
    if (goToPage !== location.pathname) {
      user?._id && navigate(goToPage);
    }
  }, [user?._id, goToPage, navigate]);

  const value = {
    user,
    setUser,
    show,
    setShow,
    toggle,
    transactions,
    setTransactions,
  };
  return (
    <CentralState.Provider value={value}>{children}</CentralState.Provider>
  );
};
export const userdata = () => {
  return useContext(CentralState);
};
