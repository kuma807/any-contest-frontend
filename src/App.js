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
import ContestRanking from "./components/Ranking/ContestRankingPage";
import RatingPage from "./components/Rating/RatingPage";
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CreateContestForm from './components/CreateContest/CreateContestForm';
import SelectContest from './components/CreateContest/SelectContest';
import CreateContest from './components/CreateProblem/CreateProblem';
import CreateProblem from './components/CreateProblem/CreateProblem';

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
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);

  
  const matchField = useRouteMatch('/fields/:field');
  const fieldName = matchField ? matchField.params.field: null;
  
  const matchContest = useRouteMatch('/contests/:contest');
  const contestName = matchContest ? matchContest.params.contest: null;

  const matchProblem = useRouteMatch('/problems/:problem');
  const problemName = matchProblem ? matchProblem.params.problem: null;

  const matchCreateContest = useRouteMatch('/create_contest/:contestName');
  const createContestName = matchCreateContest ? matchCreateContest.params.contestName: null;

  const matchCreateProblem = useRouteMatch('/create_problem/:problemName');
  const createProblemName = matchCreateProblem ? matchCreateProblem.params.problemName: null;

  const matchUserName = useRouteMatch('/rating/:userName');
  const ratingUserName = matchUserName ? matchUserName.params.userName: null;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [])

  return (
    <div>
        {(message && message.startsWith("Success:") && 
          <Alert variant="success">
            {message}
          </Alert>
        )}
        {(message && message.startsWith("Error:") && 
          <Alert variant="danger">
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
            <ContestRanking contestName={contestName}/>
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
          <Route path="/rating/:userName">
            <RatingPage userName={ratingUserName}/>
          </Route>
          <Route path="/rating">
            <RatingPage />
          </Route>
          <Route path="/create_contest/:contestName">
            <CreateContestForm contestName={createContestName} setMessage={(messageData) => setMessage(messageData)} />
          </Route>
          <Route path="/create_contest">
            <SelectContest />
          </Route>
          <Route path="/create_problem/:problemName">
            <CreateProblem problemName={createProblemName}/>
          </Route>
          <Route path="/create_problem/">
            <CreateProblem />
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