import {useHistory} from "react-router-dom";
import {Form, Button} from 'react-bootstrap';
import React, { useState } from 'react';
import loginService from "../services/login"

const LoginForm = ({setUser, setMessage}) => {
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    const id = event.target[0].value;
    const password = event.target[1].value;

    try {
      console.log(`${id} ${password}`);
      const user = await loginService({
        id, password,
      });

      setMessage(`welcome ${id}`);
      setTimeout(() => {
        setMessage(null)
      }, 10000)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      console.log(user);

      setUser({id: id, name: user.name});
      setMessage(`welcome ${user.name}`);
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    } 
    catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    history.push('/');
  }

  return (
    <div>
      <h2>login</h2>
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
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm;