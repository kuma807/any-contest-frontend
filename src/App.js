import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

import HomeForm from "./components/HomeForm";
import Fields from "./components/Fields";
import Field from "./components/Field";
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const App = () => {
  const fields = [
    {
      name: "math"
    },
    {
      name: "programe"
    },
    {
      name: "quize"
    }
  ]

  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);

  const matchField = useRouteMatch('/fields/:name')
  const field = matchField 
    ? fields.find(field => field.name === matchField.params.name)
    : null

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [])

  return (
    <div>
        {(message &&
          <Alert variant="success">
            {message}
          </Alert>
        )}
      
      <Header user={user} />

      <Switch>
        <Route path="/fields/:name">
          <Field field={field} />
        </Route>
        <Route path="/fields">
          <Fields fields={fields} />
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <LoginForm setUser={(userData) => setUser(userData)} setMessage={(messageData) => setMessage(messageData)} />
        </Route>
        <Route path="/signup">
          <SignupForm setUser={(userData) => setUser(userData)} setMessage={(messageData) => setMessage(messageData)} />
        </Route>
        <Route path="/">
          <HomeForm />
        </Route>
      </Switch>
      <div>
        <br />
        <em>kuso app</em>
      </div>
    </div>
  )
}

export default App