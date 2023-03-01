import React from "react";
import { Nav } from "react-bootstrap";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="signin-container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="label-text">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="label-text">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div className="signup-text">
            Not a User!!!{" "}
            <Nav.Link onClick={() => navigate("/signup")}>SignUp Here</Nav.Link>
          </div>
        </Form.Group>

        <Button variant="contained" size="medium">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
