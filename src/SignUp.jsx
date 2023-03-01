import React from "react";
import { Nav } from "react-bootstrap";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="signin-container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label className="label-text">UserName</Form.Label>
          <Form.Control type="text" placeholder="Enter User Name" />
        </Form.Group>
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
            Already Signed Up!!!{" "}
            <Nav.Link onClick={() => navigate("/signin")}>
              Sign in Here
            </Nav.Link>
          </div>
        </Form.Group>

        <Button variant="contained" size="medium">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default SignUp;
