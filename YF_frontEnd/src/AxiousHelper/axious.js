import axios from "axios";
const baseurl = "http://localhost:3002/api/v1";
import { toast } from "react-toastify";

const ApiendPoint = async ({ data, method, url, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return toast.error(error.response.data);
  }
};
// register the new user
export const postUser = async (data) => {
  const obj = {
    method: "post",
    url: baseurl + "/users/register",
    data,
  };
  return await ApiendPoint(obj);
};

// login user
export const loginUser = async (data) => {
  const obj = {
    method: "post",
    url: baseurl + "/users/login",
    data,
  };
  const result = await ApiendPoint(obj);
  return result;
};

// get user profile after getting the token fro  fron end
export const getUserProfile = async () => {
  const obj = {
    method: "get",
    url: baseurl + "/users",

    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const result = await ApiendPoint(obj);
  return result;
};

// post the transaction
export const postTransaction = async (data) => {
  const obj = {
    method: "post",
    url: baseurl + "/transactions/addtransaction",
    data,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  return await ApiendPoint(obj);
};
