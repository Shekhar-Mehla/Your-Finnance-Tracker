import { useState } from "react";
import { postUser, loginUser } from "../AxiousHelper/axious.js";
import { toast } from "react-toastify";
import { userdata } from "./ContextApi.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const handleOnChange = (e, form, setForm) => {
  const { name, value } = e.target;
  console.log(name, value);

  setForm({ ...form, [name]: value });
};

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
    toast.promise(result, { pending: "please wait" });
    const { status, message } = await result;
    toast[status](message);
    return;
  }
  // this code will be executed when user will login
  if (!form.confirmPasswordHashed && !form.type && !form.amount && !form.date) {
    const result = loginUser(form);
    toast.promise(result, {
      pending: "Please wait...",
      success: "Login successful!",
      error: "Login failed. Please try again.",
    });

    const { status, message, token, User } = await result;
    toast[status](message);
    console.log(status, message);
    if (status === "success") {
      toast[status](message);
      localStorage.setItem("token", token);
      setUser(User);
      navigate(goToPage);
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

export const useForm = () => {
  const [form, setForm] = useState({});
  const { setUser } = userdata();
  const navigate = useNavigate();
  const location = useLocation();
  const goToPage = location?.state?.from?.pathname || "/dashboard";
  const value = {
    handleOnChange: (e) => handleOnChange(e, form, setForm),

    handleOnSubmit: (e) => handleOnSubmit(e, form, setUser, navigate, goToPage),
  };

  return value;
};
