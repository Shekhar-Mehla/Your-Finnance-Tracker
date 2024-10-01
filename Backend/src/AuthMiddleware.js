import jwt from "jsonwebtoken";
import { UserCollection } from "../src/models/userModel/userModel.js";

export const Authmiddleware = async (req, res, next) => {
  try {
    // const token = await req.headers["authorization"];
    // console.log(token);
    const t =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMiIsImlhdCI6MTcyNzc3NTcwNH0.2CiICL9hcM__MucSt_LFgYiJXIsvMax8E8TAWHdrAyk"
    if (t) {
      const decoded = jwt.verify(t, process.env.SECRET_KEY);
      const { email } = decoded;
      const User = await UserCollection.findOne({ email });
      User.passwordHashed = null;
      req.info = User;

      next();
      return;
    }
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
      message: error.message,
    });
  }
};
