import { createContext, useContext, useEffect, useState, useRef } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { autoLogin } from "../Utility/Autologin.js";
import { getTranscation } from "../AxiousHelper/axious.js";

export const CentralState = createContext();

export const CentralstateProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchTransactions = async () => {
    try {
      const transaction = await getTranscation();
      console.log(transaction);
      if (transaction) {
        setTransactions(transaction.result);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const flag = useRef(true);
  useEffect(() => {
    user?._id && fetchTransactions() && flag.current;
    flag.current = false;
  }, [user?._id]);

  // toggle function to show and hide the transaction form on add transaction button click

  // this useeffect hook responsible to navigate the user once user is authenticated
  const goToPage = location?.state?.from?.pathname;

  useEffect(() => {
    if (user?._id) {
      navigate(goToPage);
    }
  }, [user._id, goToPage]);

  useEffect(() => {
    !user?._id && autoLoginUser();
  }, []);

  const autoLoginUser = async () => {
    const user = await autoLogin();
    if (user?._id) {
      return setUser(user);
    }
  };

  const value = {
    user,
    setUser,
     fetchTransactions,

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
