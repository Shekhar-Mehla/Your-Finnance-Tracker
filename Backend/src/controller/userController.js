import { response } from "express";
import { UserCollection } from "../models/userModel/userModel.js";

import { encryptedPassword } from "../utils/bcryptjs.js";
export const PostUsers = async (req, res) => {
  try {
    req.body.passwordHashed = encryptedPassword(req.body.passwordHashed);
    const newUser = await UserCollection(req.body).save();
    newUser?._id
      ? res.status(201).json({
          status: "successfull",
        })
      : res.status(401).jsonss({
          status: "operation could not be completed try agin later!",
        });
  } catch (error) {
    if (
      error.message.includes(
        "E11000 duplicate key error collection: YFT.users index: email_1"
      )
    ) {
      error.message =
        "email is already exists please use another email to register";
    }
    res.json({
      error: "unsuccesful",
      msg: error.message,
    });
  }
};
