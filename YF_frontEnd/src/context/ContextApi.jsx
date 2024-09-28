import { createContext, useState } from "react";
import { postUser, loginUser } from "../AxiousHelper/axious.js";
import { toast } from "react-toastify";

export const CentralState = createContext();

export const CentralstateProvider = ({ children }) => {
  const expenseTrackingQuotes = [
    {
      author: "Dave Ramsey",
      quote:
        "You must gain control over your money or the lack of it will forever control you.",
    },
    {
      author: "Suze Orman",
      quote: "The more you know about money, the more you can grow it.",
    },
    {
      author: "Robert Kiyosaki",
      quote:
        "Financial freedom is available to those who learn about it and work for it.",
    },
    {
      author: "Benjamin Franklin",
      quote: "An investment in knowledge pays the best interest.",
    },
    {
      author: "Jim Rohn",
      quote: "Take care of your body. It’s the only place you have to live.",
    },
    {
      author: "Warren Buffett",
      quote: "Beware of little expenses; a small leak will sink a great ship.",
    },
    { author: "Peter Drucker", quote: "What gets measured gets managed." },
    {
      author: "Chris Hogan",
      quote:
        "You need to tell your money where to go, not wonder where it went.",
    },
    {
      author: "T. Harv Eker",
      quote: "Your bank account is a report card of your financial habits.",
    },
    {
      author: "Mary Hunt",
      quote: "Saving is a process, not a one-time event.",
    },
    {
      author: "David Bach",
      quote: "The key to wealth is to spend less than you earn.",
    },
    {
      author: "Michael LeBoeuf",
      quote:
        "A budget is telling your money where to go instead of wondering where it went.",
    },
    {
      author: "Robert Allen",
      quote:
        "How you manage your money is a reflection of how you manage your life.",
    },
    {
      author: "Tony Robbins",
      quote:
        "Setting goals is the first step in turning the invisible into the visible.",
    },
    {
      author: "Ramit Sethi",
      quote: "You don’t have to live a life of deprivation to save money.",
    },
    {
      author: "Vicki Robin",
      quote:
        "Money is a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    },
    {
      author: "Albert Einstein",
      quote: "Compound interest is the eighth wonder of the world.",
    },
    { author: "Nadia Bilchik", quote: "Saving is a habit, not a destination." },
    {
      author: "Zig Ziglar",
      quote:
        "You don’t have to be great to start, but you have to start to be great.",
    },
    {
      author: "Katherine Paterson",
      quote:
        "You can’t just sit back and wait for things to happen; you have to make them happen.",
    },
  ];
  const [form, setForm] = useState({});
  // handle on input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };
  // onFormSubmit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (form.passwordHashed == form.confirmPasswordHashed) {
      const { method } = e.target;
      postUser(form, method);
      return;
    }
    if (!form.confirmPasswordHashed) {
      const { method } = e.target;
      loginUser(form, method);
      return;
    }
    return toast.error("password did not match");
  };

  const InputFields = [
    {
      label: "First Name",
      placeholder: "enter your first name",
      type: "text",
      name: "Fname",
      required: true,
      onChange: (e) => {
        handleOnChange(e);
      },
    },
    {
      label: "Last Name",
      placeholder: "enter your Last name",
      type: "text",
      name: "Lname",
      required: true,
      onChange: (e) => {
        handleOnChange(e);
      },
    },
    {
      label: "Email",
      placeholder: "enter your email",
      type: "email",
      name: "email",
      required: true,
      onChange: (e) => {
        handleOnChange(e);
      },
    },
    {
      label: "Password",
      placeholder: "enter your password",
      type: "password",
      name: "passwordHashed",
      required: true,
      onChange: (e) => {
        handleOnChange(e);
      },
    },
    {
      label: "Confirm Password",
      placeholder: "enter confirmed password",
      type: "password",
      name: "confirmPasswordHashed",
      required: true,
      onChange: (e) => {
        handleOnChange(e);
      },
    },
  ];
  const value = {
    InputFields,
    expenseTrackingQuotes,
    handleOnSubmit: (e) => handleOnSubmit(e),
  };
  return (
    <CentralState.Provider value={value}>{children}</CentralState.Provider>
  );
};
