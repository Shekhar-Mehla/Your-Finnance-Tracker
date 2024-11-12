import { useState } from "react";
import {
  postUser,
  loginUser,
  postTransaction,
  forgotPassword,
} from "../AxiousHelper/axious.js";
import { toast } from "react-toastify";
import { userdata } from "../context/ContextApi.jsx";
import { useNavigate } from "react-router-dom";

import { fetchTransactions } from "../Utility/fetchTransactions.js";
// this function will be called each time we change in input filed
const handleOnChange = (e, form, setForm) => {
  const { name, value } = e.target;
  console.log(name, "+", value);

  setForm({ ...form, [name]: value });
};
// this function will be call each time we submit the form such as login,registration and transaction submission
const handleOnSubmit = async (
  e,
  form,

  setUser,
  navigate,
  setTransactions,
  toggle,
  setIsSubmit
) => {
  // prevent the browser refresh on form submission
  e.preventDefault();
  setIsSubmit(true);
  setTimeout(() => {
    setIsSubmit(false);
    console.log("button is active now");
  }, 6000);

  // this code will be executed when user will register for the first time
  if (
    form.confirmPasswordHashed &&
    form.passwordHashed == form.confirmPasswordHashed
  ) {
    const result = postUser(form);
    toast.promise(result, {
      pending: "please wait your request is being processed",
    });
    const { status, message } = await result;
    toast[status](message);
    if (status === "success") {
      navigate("/login");
    }
    return;
  }
  // this code will be executed when user will login
  if (
    !form.confirmPasswordHashed &&
    !form.type &&
    !form.amount &&
    !form.date &&
    form.passwordHashed
  ) {
    // call user login api
    const { status, message, token, User } = await loginUser(form);
    console.log("user login function");
    if (status === "success") {
      console.log("this login code is executed");
      localStorage.setItem("token", token);
      setUser(User);

      // call transaction api

      const pending = fetchTransactions();
      toast.promise(pending, {
        pending: "please what while are fetching the data from server",
      });
      const { result } = await pending;
      setTransactions(result);
      toast[status](message);
    }

    return;
  }
  // this code will be executed when user submit their email to get reset password link to their email addresss
  if (
    !form.confirmPasswordHashed &&
    !form.type &&
    !form.amount &&
    !form.date &&
    !form.passwordHashed
  ) {
    const result = forgotPassword(form);
    return;
  }

  // this code will be executed when user will add new transaction
  if (form.type || form.amount || form.date || form.Tittle) {
    const { status } = await postTransaction(form);
    console.log(status);
    if (status == "success") {
      toggle();

      const pending = fetchTransactions();
      toast.promise(pending, {
        pending: "please wait while we are processing your request",
      });
      const { status, message, result } = await fetchTransactions();
      console.log(result);
      setTransactions(result);

      toast[status](message);
    }

    return;
  }
  return toast.error("password did not match");
};

export const useForm = () => {
  const [form, setForm] = useState({});
  const { setUser, setTransactions, toggle, setIsSubmit, user } = userdata();
  const navigate = useNavigate();
  console.log(user);
  const value = {
    handleOnChange: (e) => handleOnChange(e, form, setForm),

    handleOnSubmit: (e) =>
      handleOnSubmit(
        e,
        form,

        setUser,
        navigate,
        setTransactions,
        toggle,
        setIsSubmit
      ),
  };

  return value;
};
