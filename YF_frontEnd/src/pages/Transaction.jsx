import React, { useEffect, useRef, useState } from "react";
import TransactionForm from "../Component/TransactionForm";
import Table from "react-bootstrap/Table";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  ModalHeader,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { userdata } from "../context/ContextApi";
import { getTranscation } from "../AxiousHelper/axious.js";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { MdDelete } from "react-icons/md";
import { TbHttpDelete } from "react-icons/tb";

const Transaction = () => {
  const [display, setDisplay] = useState(false);
  const [transactionsToDelete, setTransactionToDelete] = useState([]);

  const { toggle, show } = userdata();
  const { user, transactions, setTransactions } = userdata();

  const shuoldfect = useRef(true);
  useEffect(() => {
    user?._id && shuoldfect.current && fetchTransactions();
    if (user._id) {
      shuoldfect.current = false;
    }
  }, [user._id]);

  const handalOnDeletButtonClick = () => {
    if (transactionsToDelete.length > 0) {
      console.log("call delete api and fetch the  transaction from database ");
    }
    setDisplay(!display);
    return;
  };
  const handleOnSeearch = (e) => {
    const { value } = e.target;
  };
  const handleOnSelectChange = (e) => {
    const { value, checked } = e.target;
    if (value == "Select All") {
      console.log("selet all and run this code");
      checked
        ? setTransactionToDelete(transactions.map((trans) => trans._id))
        : setTransactionToDelete([]);
    } else {
      checked
        ? setTransactionToDelete([...transactionsToDelete, value])
        : setTransactionToDelete([
            ...transactionsToDelete.filter((_id) => _id != value),
          ]);
    }
  };
  console.log(transactionsToDelete);
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
                <Form.Control
                  onChange={handleOnSeearch}
                  size="md"
                  type="text"
                  placeholder="Search transaction..."
                />
              </Col>
              <Col md="auto" className="d-grid">
                <Button className="" onClick={toggle}>
                  ADD Transaction
                </Button>
              </Col>
              <Col md="auto">
                <Button
                  onClick={handalOnDeletButtonClick}
                  className="  fs-2 text-danger bg-transparent border-0 border"
                >
                  <MdDelete></MdDelete>
                  <TbHttpDelete></TbHttpDelete>
                </Button>
              </Col>
            </Row>
          </Card.Header>
        </Card>

        <div className={display ? "display" : "display-none"}>
          <Form.Check
            value="Select All"
            onChange={handleOnSelectChange}
            label="Select All"
            checked={transactionsToDelete.length == transactions.length}
          ></Form.Check>
        </div>
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
                    <td className="d-flex gap-2 ">
                      {" "}
                      {i}
                      <Form.Check
                        onChange={handleOnSelectChange}
                        checked={transactionsToDelete.includes(transaction._id)}
                        value={transaction._id}
                        className={display ? "display" : "display-none"}
                      ></Form.Check>
                    </td>

                    <td> {transaction.Tittle}</td>

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
