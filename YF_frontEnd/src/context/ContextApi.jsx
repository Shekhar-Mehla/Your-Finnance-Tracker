import { createContext, useEffect, useState } from "react";
import { postUser, loginUser, getUserProfile } from "../AxiousHelper/axious.js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { InputFields } from "../Utility/Inputfield.js";
import { expenseTrackingQuotes } from "../Utility/Quotes.js";

export const CentralState = createContext();

export const CentralstateProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  // toggle function to show and hide the model
  const toggle = () => {
    show ? setShow(false) : setShow(true);
  };
  const location = useLocation();
  if (!user) {
    setIsLoggedIn(false);
  }

  // handle on input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setForm({ ...form, [name]: value });
  };
  // onFormSubmit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    // register new user
    if (
      form.confirmPasswordHashed &&
      form.passwordHashed == form.confirmPasswordHashed
    ) {
      console.log("post user");
      const result = postUser(form);
      toast.promise(result, { pending: "please wait" });
      const { status, message } = await result;
      toast[status](message);
      return;
    }
    // login user
    if (!form.confirmPasswordHashed && !form.type) {
      console.log("login");
      const result = loginUser(form);
      toast.promise(result, { pending: "please wait" });

      const { status, message, token } = await result;
      toast[status](message);
      localStorage.setItem("token", token);
      token ? navigate("/dashboard") : navigate("/login");

      return;
    }
    if (form.type) {
      console.log("on transactuion submit");
      return;
    }
    return toast.error("password did not match");
  };

  const value = {
    handleOnChange: (e) => handleOnChange(e),
    InputFields,
    expenseTrackingQuotes,
    handleOnSubmit: (e) => handleOnSubmit(e),
    isLoggedIn,
    setIsLoggedIn,
    show,
    setShow,
    toggle,
    handleOnChange: (e) => handleOnChange(e),
  };
  return (
    <CentralState.Provider value={value}>{children}</CentralState.Provider>
  );
};
