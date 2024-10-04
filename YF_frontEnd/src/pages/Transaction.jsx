import React from "react";
import TransactionForm from "../Component/TransactionForm";
import Table from "react-bootstrap/Table";
import { Button, Container } from "react-bootstrap";

const Transaction = () => {
  return (
    <Container>
      {" "}
      <div>
        <TransactionForm></TransactionForm>
        <div className="m-2">
          <Button>ADD Transaction</Button>
        </div>
        <Table className="table table-custom table-striped table-bordered table-hover">
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
