import React, { useEffect, useState } from "react";
import TransactionForm from "../Component/TransactionForm";
import Table from "react-bootstrap/Table";
import { Button, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { userdata } from "../context/ContextApi";
import { getTranscation } from "../AxiousHelper/axious.js";

const Transaction = () => {
  const { toggle, show } = userdata();
  const { user, transactions, setTransactions } = userdata();

  useEffect(() => {
    user?._id && fetchTransactions();
  }, [user._id]);

  const fetchTransactions = async () => {
    try {
      const transaction = await getTranscation();

      if (transaction) {
        setTransactions(transaction.result);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const TottalBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);
  return (
    <Container>
      {" "}
      <div>
        <Modal
          className=" "
          show={show}
          onHide={toggle}
          size="md
          "
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <h2 className="mb-3">Enter your Transaction</h2>
          </Modal.Header>
          <Modal.Body>
            <TransactionForm></TransactionForm>
          </Modal.Body>
        </Modal>

        <div className="m-2">
          <Button onClick={toggle}>ADD Transaction</Button>
        </div>
        <Table className="table table-custom table-striped  table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Tittle</th>
              <th>Type</th>
              <th>In</th>
              <th>Out</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {console.log(transactions)}
            {transactions.length > 0 &&
              transactions.map((transaction, i) => {
                return (
                  <tr
                    key={transaction._id}
                    style={{
                      backgroundColor:
                        transactions.length < 0 ? "#f8d7da" : "#d4edda",
                    }}
                  >
                    <td>{i}</td>
                    <td>{transaction.Tittle}</td>
                    <td>{transaction.type}</td>
                    {transaction.type === "income" ? (
                      <>
                        <td className="text-success">
                          <strong>${transaction.amount}.00</strong>
                        </td>
                        <td></td>
                      </>
                    ) : (
                      <>
                        <td></td>
                        <td className="text-danger">
                          <strong className="ml-2">
                            -${transaction.amount}.00
                          </strong>
                        </td>
                      </>
                    )}

                    <td>{transaction.TransactionDate.slice(0, 10)}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          {TottalBalance > 0 ? (
            <div className="text-success">
              <strong>Total balance =${TottalBalance}</strong>
            </div>
          ) : (
            <div className="text-danger">
              <strong>Total balance =-${Math.abs(TottalBalance)}</strong>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Transaction;
