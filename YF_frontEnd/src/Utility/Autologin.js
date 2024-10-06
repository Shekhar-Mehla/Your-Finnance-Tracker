import { getUserProfile } from "../AxiousHelper/axious";

const token = localStorage.getItem("token");
export const autoLogin = async () => {
  try {
    if (token) {
      const data = await getUserProfile();
      return data;
    }
  } catch (error) {
    console.log(error.message, "no token in the browser storage");
  }
};
