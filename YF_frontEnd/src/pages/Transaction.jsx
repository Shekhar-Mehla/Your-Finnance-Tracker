import React, { useEffect, useState } from "react";
import TransactionForm from "../Component/TransactionForm";
import Table from "react-bootstrap/Table";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { userdata } from "../context/ContextApi";
import { getTranscation } from "../AxiousHelper/axious.js";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

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
      <Row>
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
        <Card className="transactionNav">
          <Card.Header>
            {" "}
            <Row className="  align-items-center mb-3  mt-2 mb-2 d-flex justify-content-between gap-2">
              <Col md="auto">
                {" "}
                <Button variant="primary" className="w-100">
                  Number of Transactions <Badge bg="secondary">9</Badge>
                  <span className="visually-hidden">unread messages</span>
                </Button>
              </Col>
              <Col md="auto" className="d-grid">
                <Form.Control size="md" type="text" placeholder="Large text" />
              </Col>
              <Col md="auto" className="d-grid">
                <Button className="" onClick={toggle}>
                  ADD Transaction
                </Button>
              </Col>
            </Row>
          </Card.Header>
        </Card>

        <Table className="table table-custom table-striped border mt-3  table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Tittle</th>

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
        <Card className="text-center p-3 tottalBalance mb-3">
          {TottalBalance > 0 ? (
            <Row className="text-success">
              <strong>Total balance =${TottalBalance}</strong>
            </Row>
          ) : (
            <Row className="text-danger">
              <strong>Total balance =-${Math.abs(TottalBalance)}</strong>
            </Row>
          )}
        </Card>
      </Row>
    </Container>
  );
};

export default Transaction;
