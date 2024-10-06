import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { userdata } from "../context/ContextApi.jsx";
import CustomeInput from "../Component/CustomeInput.jsx";

const TransactionForm = () => {
  const { InputFields, handleOnSubmit, handleOnChange } = userdata();

  // filtering the array for custom input fileds
  const LoginInputFields = InputFields.filter(
    (input) =>
      input.name == "Tittle" || input.name == "amount" || input.name == "date"
  );

  return (
    <>
      <Container className="bg-light">
        <Row className="justify-content-center align-items-center  ">
          <Col md={12} className=" shadow-lg rounded bg-white">
            <div className="text-center mb-4">
              <p className="text-muted">Please log in to continue.</p>
            </div>

            <Form onSubmit={(e) => handleOnSubmit(e)}>
              <Form.Group
                className="mb-3"
                controlId="formGridState"
                onChange={handleOnChange}
              >
                <Form.Label>Transaction Type</Form.Label>
                <Form.Select required name="type" defaultValue="">
                  <option disabled value="">
                    {" "}
                    Choose...
                  </option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Form.Select>
              </Form.Group>
              {LoginInputFields.map((input) => (
                <CustomeInput
                  key={input.name}
                  onChange={handleOnChange}
                  {...input}
                />
              ))}
              <Button
                className="w-100 mt-3 btn-animate"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default TransactionForm;
