import axios from "axios";
const baseurl = "http://localhost:3000/api/v1";
import { toast } from "react-toastify";

const ApiendPoint = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    const serverdata = await response.data;

    return toast[serverdata.status](serverdata.message);
  } catch (error) {
    return toast.error(error.message);
  }
};
// register the new user
export const postUser = (data, method) => {
  const obj = {
    method,
    url: baseurl + "/users/register",
    data,
  };
  ApiendPoint(obj);
};

// login user
export const loginUser = (data, method) => {
  const obj = {
    method,
    url: baseurl + "/users/login",
    data,
  };
  ApiendPoint(obj);
};
