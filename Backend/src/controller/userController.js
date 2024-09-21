import { response } from "express";
import { UserCollection } from "../models/userModel/userModel.js";
import bcrypt from "bcrypt";
export const PostUsers = async (req, res) => {
  try {
    const saltRounds = 20;
    // encrypted the user password before storing to db
    req.body.passwordHashed = bcrypt.hash(req.body.passwordHashed
      process.env.SECRET_KEY,
      saltRounds,
      function (err, hash) {
        console.log(hash);
      }
    );
    const newUser = await UserCollection(req.body).save();
    newUser?._id
      ? res.status(201).json({
          status: "successfull",
        })
      : res.status(401).jsonss({
          status: "operation could not be completed try agin later!",
        });
  } catch (error) {
    res.json({
      error: error.message,
      response,
    });
  }
};
