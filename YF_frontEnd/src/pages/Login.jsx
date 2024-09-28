import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { imges } from "../assets/assets.js";
import Quotes from "../Component/Quotes.jsx";
import { CentralState } from "../context/ContextApi.jsx";
import { useContext } from "react";
import CustomeInput from "../Component/CustomeInput.jsx";
const Login = () => {
  const { InputFields, handleOnSubmit } = useContext(CentralState);
  const LoginInputFields = InputFields.filter(
    (input) => input.name == "email" || input.name == "passwordHashed"
  );

  return (
    <>
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
            <h2>Login !</h2>
            <Form
              onSubmit={(e) => handleOnSubmit(e)}
              className="p-3"
              method="post"
            >
              {LoginInputFields.map((input) => {
                return (
                  <CustomeInput key={input.name} {...input}></CustomeInput>
                );
              })}
              <Button className="w-100" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
