import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const CustomeInput = () => {
  const InputFields = [
    {
      label: "First Name",
      placeholder: "enter your first name",
      type: "text",
      name: "Fname",
      required: true,
    },
    {
      label: "Last Name",
      placeholder: "enter your Last name",
      type: "text",
      name: "Lname",
      required: true,
    },
    {
      label: "First Name",
      placeholder: "enter your email",
      type: "email",
      name: "email",
      required: true,
    },
    {
      label: "Password",
      placeholder: "enter your password",
      type: "password",
      name: "passwordHashed",
      required: true,
    },
    {
      label: "Confirm Password",
      placeholder: "enter confirmed password",
      type: "password",
      name: "passwordHashed",
      required: true,
    },
  ];

  return (
    <>
      
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>{}</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
    </>
  );
};

export default CustomeInput;
