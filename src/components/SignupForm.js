import {useHistory} from "react-router-dom";
import {Form, Button} from 'react-bootstrap';
import React from 'react';
import signupService from "../services/signup";

const SignupForm = ({setUser, setMessage}) => {
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    const id = event.target[0].value;
    const name = event.target[1].value;
    const password = event.target[2].value;
    const confirmePassword = event.target[3].value;
    if (password !== confirmePassword) {
      setMessage('Error: 入力されたパスワードが一致しません');
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return;
    }
    try {
      const user = await signupService({
        id, password, name
      });
      setUser({id: id, name: name});
      setMessage(`Success: welcome ${name}`);
      setTimeout(() => {
        setMessage(null)
      }, 5000);
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      history.push('/');
    }
    catch (exception) {
      setMessage('Error: アカウントを作成出来ませんでした、違うidを試してみてください')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>signup</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>id:</Form.Label><span class="text-danger">※登録後idは変更出来ません</span>
          <Form.Control
            type="text"
            name="id"
          />
          <Form.Label>user name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
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