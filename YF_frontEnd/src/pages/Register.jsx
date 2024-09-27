import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CustomeInput from "../Component/CustomeInput.jsx";
import { CentralState } from "../context/ContextApi.jsx";
import { useContext } from "react";
import { imges } from "../assets/assets.js";
import Quotes from "../Component/Quotes.jsx";

const Register = () => {
  const { InputFields } = useContext(CentralState);
  console.log(InputFields);
  return (
    <Container className=" p-5 bg-dark registerContainer text-white d-flex justify-content-center align-items-center">
      <Row className="w-100  ">
        <Col md={5}>
          <div
            className="d-flex justify-content-center align-items-center "
            style={{
              backgroundImage: `url(${imges[0]})`,
              width: "100%",
              height: "90vh",

              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "2px solid #000",
            }}
          >
            <Quotes></Quotes>
          </div>
        </Col>
        <Col className="border " md={6}>
          <h2>Register here</h2>
          <Form className="p-3">
            {InputFields.map((input) => {
              return <CustomeInput key={input.name} {...input}></CustomeInput>;
            })}
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
