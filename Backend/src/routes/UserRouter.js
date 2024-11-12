import express from "express";
import {
  PostUsers,
  GetUser,
  getUserProfile,forgotPassword
} from "../controller/userController.js";
import { Authmiddleware } from "../AuthMiddleware.js";

export const UserRoute = express.Router();

UserRoute.post("/register", PostUsers);
UserRoute.post("/login", GetUser);
UserRoute.post("/forgotPassword", forgotPassword);
UserRoute.get("/", Authmiddleware, getUserProfile);
