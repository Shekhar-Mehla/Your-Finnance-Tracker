import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CentralState } from "../context/ContextApi.jsx";
import { useContext } from "react";
import CustomeInput from "../Component/CustomeInput.jsx";

const TransactionForm = () => {
  const { InputFields, handleOnSubmit } = useContext(CentralState);
  const LoginInputFields = InputFields.filter(
    (input) =>
      input.name == "Tittle" || input.name == "amount" || input.name == "date"
  );

  return (
    <>
      <Container className="bg-light vh-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col md={6} className="p-5 shadow-lg rounded bg-white">
            <div className="text-center mb-4">
              <h2 className="mb-3">Enter your Transaction</h2>
              <p className="text-muted">Please log in to continue.</p>
            </div>

            <Form onSubmit={(e) => handleOnSubmit(e)}>
              <Form.Group controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option disabled> Choose...</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Form.Select>
              </Form.Group>
              {LoginInputFields.map((input) => (
                <CustomeInput key={input.name} {...input} />
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
