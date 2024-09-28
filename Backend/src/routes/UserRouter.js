import express from "express";
import { PostUsers, GetUser } from "../controller/userController.js";
export const route = express.Router();

route.post("/register", PostUsers);
route.post("/login", GetUser);
