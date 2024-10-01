import axios from "axios";
const baseurl = "http://localhost:3000/api/v1";
import { toast } from "react-toastify";

const ApiendPoint = async ({ method, url, data, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    const serverdata = response.data;

    const { status, message } = await serverdata;

    return serverdata;
  } catch (error) {
    return toast.error(error.message);
  }
};
// register the new user
export const postUser = async (data, method) => {
  const obj = {
    method,
    url: baseurl + "/users/register",
    data,
  };
  return await ApiendPoint(obj);
};

// login user
export const loginUser = (data, method) => {
  const obj = {
    method,
    url: baseurl + "/users/login",
    data,
  };
  return ApiendPoint(obj);
};

// get user profile after getting the token fro  fron end
export const getUserProfile = () => {
  const obj = {
    method: "get",
    url: baseurl + "/users",

    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  return ApiendPoint(obj);
};
