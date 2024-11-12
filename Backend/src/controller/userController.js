import { UserCollection } from "../models/userModel/userModel.js";
import { encryptedPassword, ComparePassword } from "../utils/bcryptjs.js";
import { jwtTocken } from "../utils/Jwt.js";
import crypto from "crypto";
// add new user to the database
export const PostUsers = async (req, res) => {
  try {
    req.body.confirmPasswordHashed = null;
    req.body.passwordHashed = encryptedPassword(req.body.passwordHashed);
    const newUser = await UserCollection(req.body).save();
    newUser?._id
      ? res.status(201).json({
          status: "success",
          message: "you have registered succefully. you may login now!",
        })
      : res.status(401).jsons({
          status: "error",
          message: "operation could not be completed try agin later!",
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
      status: "error",
      message: error.message,
    });
  }
};
export const GetUser = async (req, res) => {
  try {
    // verify user to login step by step
    console.log("hello word");
    const { email } = req.body;
    console.log(email);
    // step 1. get user by email
    const User = await UserCollection.findOne({ email });
    console.log(User);
    if (User?._id) {
      console.log("user has found now i will check passowrd");
      // step 2 compare the password using bcrypt
      const isverification = ComparePassword(
        User.passwordHashed,
        req.body.passwordHashed
      );
      console.log(isverification);
      // add jwt here if verification true
      if (isverification) {
        const token = jwtTocken({ email });

        User.passwordHashed = null;
        console.log(User + "hello i am login ");
        res.status(200).json({
          status: "success",
          message: "you have logged i  succesfullly",
          User,
          token,
        });
      }
      return;
    }
    res.status(401).json({
      status: "error",
      message: "invalid email address check your email and try again!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    // verify user to login step by step
    console.log("forgot password api is");
    const { email } = req.body;
    console.log(email);
    // step 1. get user by email
    const User = await UserCollection.findOne({ email });
    console.log(User);
    if (User?._id) {
      console.log(
        "all good till here start to implement the forgot password implemetation"
      );

      // step 1
      // create the password reset token

      const resetToken = crypto.randomBytes(20).toString("hex");
      console.log(resetToken);
      // step 2
      // create the password reset token expire
      const resetPasswordExpire = Date.now() + 3600000; // 1 hour expiry time
      console.log(resetPasswordExpire);
      // step 3
      // save token to the database
      User.resetPasswordToken = resetToken;
      User.resetPasswordExpire = resetPasswordExpire;
      User.save();

      // step 4
      // create url to send to user email with reset token
      const resetLink =
        process.env.FRONT_END_RESET_PASSWPRD_LINK + `/:${resetToken}`;

      // step 5
      // send url to user email:

      return;
    }

    res.status(400).json({
      status: "error",
      message: "you do not have any associated account with this email address",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
export const getUserProfile = async (req, res, next) => {
  try {
    const user = req.info;
    console.log(user);
    const { _id } = req.info;
    if (_id) {
      res.status(200).json({
        status: "sucsess",
        message: "user has found",

        user,
      });
      return;
    }
    res.status(400).json({
      error: "error",
      message: "cannot find user",
    });
  } catch (error) {
    res.status(400).json({
      error: "error",
      message: error.message,
    });
  }
};
