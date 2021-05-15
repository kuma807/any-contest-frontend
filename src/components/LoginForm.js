import {useHistory} from "react-router-dom";
import {Form, Button} from 'react-bootstrap';
import React from 'react';
import loginService from "../services/login";

const LoginForm = ({setUser, setMessage}) => {
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    const id = event.target[0].value;
    const password = event.target[1].value;

    try {
      const user = await loginService({
        id, password,
      });

      setMessage(`Success: welcome ${id}`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser({id: id, name: user.name});
      setMessage(`Success: welcome ${user.name}`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      history.push('/');
    } 
    catch (exception) {
      setMessage('Error: wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
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