import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CustomeInput from "../Component/CustomeInput.jsx";
const Register = () => {
  return (
    <Container className="bg-dark p-5 registerContainer text-white d-flex justify-content-center align-items-center">
      <Row className="w-100  ">
        <Col md={4}>qoutes here</Col>
        <Col className="border " md={6}>
          <h2>Register here</h2>
          <Form className="p-3">
            <CustomeInput></CustomeInput>
            <Button className="w-100" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
