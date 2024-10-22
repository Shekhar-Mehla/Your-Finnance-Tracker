import { useState } from "react";
import {
  postUser,
  loginUser,
  postTransaction,
} from "../AxiousHelper/axious.js";
import { toast } from "react-toastify";
import { userdata } from "./ContextApi.jsx";
import { useLocation, useNavigate } from "react-router-dom";
// this function will be called each time we change in input filed
const handleOnChange = (e, form, setForm) => {
  const { name, value } = e.target;
  console.log(name, value);

  setForm({ ...form, [name]: value });
};
// this function will be call each time we submit the form such as login,registration and transaction submission
const handleOnSubmit = async (e, form, setUser, navigate, goToPage) => {
  // prevent the browser refresh on form submission
  e.preventDefault();
  console.log(goToPage);
  // this code will be executed when user will register for the first time
  if (
    form.confirmPasswordHashed &&
    form.passwordHashed == form.confirmPasswordHashed
  ) {
    console.log("post user");
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
  if (!form.confirmPasswordHashed && !form.type && !form.amount && !form.date) {
    const { status, message, token, User } = await loginUser(form);
    toast[status](message);
    if (status === "success") {
      localStorage.setItem("token", token);
      setUser(User);
      navigate(goToPage);
    }

    return;
  }

  // this code will be executed when user will add new transaction
  if (form.type || form.amount || form.date || form.Tittle) {
    const pending = postTransaction(form);
    toast.promise(pending, { pending: "please wait" });
    const { status, message } = await pending;
    console.log(status, message);
    toast[status](message);
    if (status == "success") {
      await fetchTransactions();
      console.log("i ma hewre");
    }
    return;
  }
  return toast.error("password did not match");
};

export const useForm = () => {
  const [form, setForm] = useState({});
  const { setUser, fetchTransactions } = userdata();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitted, setIssubmitted] = useState(false);
  const goToPage = location?.state?.from?.pathname || "/dashboard";
  const value = {
    handleOnChange: (e) => handleOnChange(e, form, setForm),

    handleOnSubmit: (e) =>
      handleOnSubmit(
        e,
        form,
        setUser,
        navigate,
        goToPage,
        setIssubmitted,
        fetchTransactions
      ),
  };

  return value;
};
