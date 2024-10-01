import express from "express";
import { PostTransaction,getTransaction } from "../controller/TransactionController.js";
// import {
//   PostUsers,
//   GetUser,
//   getUserProfile,
// } from "../controller/userController.js";
import { Authmiddleware } from "../AuthMiddleware.js";
export const TransactionsRoute = express.Router();
TransactionsRoute.post("/", PostTransaction);
TransactionsRoute.get("/", getTransaction);
