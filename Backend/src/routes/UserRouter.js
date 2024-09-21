import express from "express";
import { PostUsers } from "../controller/userController.js";
export const route = express.Router();

route.post("/", PostUsers);
