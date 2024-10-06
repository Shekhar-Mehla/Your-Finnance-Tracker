import { createContext, useContext, useEffect, useState } from "react";
import { postUser, loginUser } from "../AxiousHelper/axious.js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { InputFields } from "../Utility/Inputfield.js";
import { expenseTrackingQuotes } from "../Utility/Quotes.js";

export const CentralState = createContext();

export const CentralstateProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({});
  // toggle function to show and hide the transaction form on add transaction button click

  const toggle = () => {
    show ? setShow(false) : setShow(true);
  };

  const goToPage = location?.state?.from?.pathname;
  // this useeffect hook responsible to navigate the user once user is authenticated
  console.log(goToPage);

  useEffect(() => {
    if (goToPage !== location.pathname) {
      user?._id && navigate(goToPage);
    }
  }, [user?._id, goToPage, navigate]);

  // this function will be called each time we change in input filed
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setForm({ ...form, [name]: value });
    console.log(form);
  };
  // this function will be call each time we submit the form such as login,registration and transaction submission

  const handleOnSubmit = async (e) => {
    // prevent the browser refresh on form submission
    e.preventDefault();

    // this code will be executed when user will register for the first time
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
    // this code will be executed when user will login
    if (
      !form.confirmPasswordHashed &&
      !form.type &&
      !form.amount &&
      !form.date
    ) {
      const result = loginUser(form);
      toast.promise(result, { pending: "please wait" });

      const { status, message, token, User } = await result;
      toast[status](message);
      if (status === "success") {
        localStorage.setItem("token", token);
        setUser(User);
        navigate("/dashboard");
      }

      return;
    }
    // this code will be executed when user will add new transaction
    if (form.type || form.amount || form.date || form.Tittle) {
      console.log(form);
      return;
    }
    return toast.error("password did not match");
  };

  const value = {
    user,
    setUser,
    handleOnChange: (e) => handleOnChange(e),
    InputFields,
    expenseTrackingQuotes,
    handleOnSubmit: (e) => handleOnSubmit(e),

    show,
    setShow,
    toggle,
  };
  return (
    <CentralState.Provider value={value}>{children}</CentralState.Provider>
  );
};
export const userdata = () => {
  return useContext(CentralState);
};
