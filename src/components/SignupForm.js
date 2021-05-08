import {useHistory} from "react-router-dom";
import {Form, Button} from 'react-bootstrap';
import React, { useState } from 'react';

const SignupForm = ({setUser, setMessage}) => {
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    const id = event.target[0].value;
    const password = event.target[1].value;
    setUser({id: id, name: "tempName"});
    setMessage(`welcome ${id}`);
    setTimeout(() => {
      setMessage(null)
    }, 10000)
    history.push('/');
  }

  return (
    <div>
      <h2>signup</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>id:</Form.Label>
          <Form.Control
            type="text"
            name="id"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
          />
          <Form.Label>confirme password:</Form.Label>
          <Form.Control
            type="password"
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SignupForm;