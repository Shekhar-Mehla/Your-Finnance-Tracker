import { createContext, useContext, useEffect, useState, useRef } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { autoLogin } from "../Utility/Autologin.js";

import { fetchTransactions } from "../Utility/fetchTransactions.js";

export const CentralState = createContext();

export const CentralstateProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const autologinflag = useRef(true);
  const autotransactionflag = useRef(true);

  const toggle = () => {
    show ? setShow(false) : setShow(true);
  };

  const goToPage = location?.state?.from?.pathname || location.pathname
  console.log(goToPage)
  
  console.log(location)
  useEffect(() => {
    if (autologinflag.current) {
      !user?._id && autoLoginUser();
      return () => (autologinflag.current = false);
    }
  }, [user]);
  useEffect(() => {
    user?._id && navigate(goToPage);
  }, [user, goToPage]);

  useEffect(() => {
    if (autotransactionflag.current) {
      updateTransaction();
    }
    return () => (autotransactionflag.current = false);
  }, [transactions?.length]);

  const autoLoginUser = async () => {
    const fetchUser = await autoLogin();

    if (fetchUser?._id) {
      setUser(fetchUser);
      return;
    }
  };
  const updateTransaction = async () => {
    const { result } = await fetchTransactions();
    setTransactions(result);
  };
  const value = {
    user,
    setUser,
    toggle,
    show,

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
