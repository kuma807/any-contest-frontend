import React, { useState, useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';

import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

import HomeForm from "./components/HomeForm";
import Fields from "./components/Fields";
import Field from "./components/Field";
import Contest from "./components/Contest";
import Problems from "./components/Problems";
import Problem from "./components/Problem";
import Submissions from "./components/Submission/Submissions";
import Ranking from "./components/Ranking/Ranking";
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
  // const fields = [
  //   {
  //     name: "math",
  //     description: "数学のコンテスト",
  //     contests: [
  //       {
  //         name: "math1",
  //         minRating: 0,
  //         maxRating: 1999,
  //         maxPref: 2400,
  //         penalty: 300,
  //         startTime: new Date(2021, 4, 8, 21, 0, 0),
  //         endTime: new Date(2021, 4, 8, 22, 39, 59, 999),
  //         problem: [
  //           {
  //             id: 0,
  //             name: "problem1",
  //             content: "whats 1 + 1",
  //             writer: "user1"
  //           },
  //           {
  //             id: 1,
  //             name: "problem2",
  //             content: "whats 5 / 10",
  //             writer: "user1"
  //           }
  //         ],
  //         participant: [
  //           {
  //             id: "user1"
  //           },
  //           {
  //             id: "user2"
  //           }
  //         ],
  //         submission:[
  //           {
  //             id:0
  //           },
  //           {
  //             id:1
  //           }
  //         ]
  //       },
  //       {
  //         name: "superMath",
  //         minRating: 1200,
  //         maxRating: 99999,
  //         maxPref: 99999,
  //         penalty: 300,
  //         startTime: new Date(2021, 4, 9, 21, 0, 0),
  //         endTime: new Date(2021, 4, 9, 22, 59, 59, 999),
  //         problem: [
  //           {
  //             id: 0,
  //             name: "max1",
  //             content: "whats 1000 + 1000",
  //             writer: "user1"
  //           },
  //           {
  //             id: 1,
  //             name: "problem2",
  //             content: "whats 5 * 1000 / 10",
  //             writer: "user2"
  //           }
  //         ],
  //         participant: [
  //           {
  //             id: "user1"
  //           },
  //           {
  //             id: "user2"
  //           },
  //           {
  //             id: "user3"
  //           }
  //         ],
  //         submission:[
  //           {
  //             id:0
  //           },
  //           {
  //             id:1
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     name: "programe",
  //     description: "競プロのコンテスト"
  //   },
  //   {
  //     name: "quize",
  //     description: "クイズのコンテスト"
  //   }
  // ]

  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);

  const matchField = useRouteMatch('/fields/:field');
  const fieldName = matchField ? matchField.params.field: null;

  const matchContest = useRouteMatch('/contests/:contest');
  const contestName = matchContest ? matchContest.params.contest: null;

  const matchProblem = useRouteMatch('/problems/:problem');
  const problemName = matchProblem ? matchProblem.params.problem: null;

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
      <Container>
        <Switch>
          <Route path="/fields/:field">
            <Field fieldName={fieldName} />
          </Route>
          <Route path="/contests/:contest/problems">
            <Problems contestName={contestName} />
          </Route>
          <Route path="/contests/:contest/submissions">
            <Submissions contestName={contestName} />
          </Route>
          <Route path="/contests/:contest/ranking">
            <Ranking contestName={contestName} numShow={1}/>
          </Route>
          <Route path="/contests/:contest">
            <Contest contestName={contestName} />
          </Route>
          <Route path="/problems/:problem">
            <Problem problemName={problemName} />
          </Route>
          <Route path="/fields">
            <Fields />
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
      </Container>
    </div>
  )
}

export default App