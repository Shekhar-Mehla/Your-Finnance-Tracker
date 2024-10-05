import React, { useContext } from "react";
import TransactionForm from "../Component/TransactionForm";
import Table from "react-bootstrap/Table";
import { Button, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { CentralState } from "../context/ContextApi";

const Transaction = () => {
  const { toggle, show } = useContext(CentralState);

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
        <Table className="table table-custom table-striped table-bordered border-dark border table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Tittle</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Transaction;
