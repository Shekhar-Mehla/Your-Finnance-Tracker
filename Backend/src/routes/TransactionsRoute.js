import express from "express";
import {
  PostTransaction,
  getTransaction,
  deleteTransaction,
} from "../controller/TransactionController.js";

export const TransactionsRoute = express.Router();
TransactionsRoute.post("/addtransaction", PostTransaction);
TransactionsRoute.get("/", getTransaction);
TransactionsRoute.delete("/deleteTransactins", deleteTransaction);
