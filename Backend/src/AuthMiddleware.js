import jwt from "jsonwebtoken";
import { UserCollection } from "../src/models/userModel/userModel.js";

export const Authmiddleware = async (req, res, next) => {
  try {
    const token = await req.headers["authorization"];
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
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
