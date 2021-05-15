import ContestHeader from "./Header/ContestHeader";
import { Jumbotron, Button } from 'react-bootstrap';
import {getContest, register, unregister} from "../services/contests";
import { useState, useEffect } from "react";
import CreateAccountButton from "./CreateAccountButton";

const Contest = ({ contestName }) => {
  const [contest, setContest] = useState(null);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [registered, setRegistered] = useState(true);
  const [contestStarted, setContestStarted] = useState(true);

  const handleRegister = (event) => {
    event.preventDefault();
    register(contestName);
    setRegistered(true);
  }
  const handleUnregister = (event) => {
    event.preventDefault();
    unregister(contestName);
    setRegistered(false);
  }

  useEffect(() => {
    getContest(contestName).then(res => {
      setContest(res[0]);
      const storage = JSON.parse(window.localStorage.getItem('loggedUser'));
      if (storage !== null) {
        const id = storage.userid;
        const newRegistered = res[0].ranking.filter((rank) => rank.id === id).length === 0 ? false: true;
        setRegistered(newRegistered);
        setIsLogedIn(true);
        setContestStarted(res[0]["__v"]);
      }
    });
  },[]);
  if (contest === null) {
    return <div>Loading contests...</div>;
  }
  return (
    <>
      <ContestHeader contestName={contestName} active="home"/>
      <Jumbotron>
        <h1>{contest.name}</h1>
        <div>
          {contest.description}
        </div>
        {!contestStarted && isLogedIn && !registered &&
          <Button variant="primary" onClick={handleRegister}>登録</Button>
        }
        {!contestStarted && isLogedIn && registered &&
          <Button variant="secondary" onClick={handleUnregister}>登録解除</Button>
        }
        {!isLogedIn &&
          <CreateAccountButton />
        }
      </Jumbotron>
    </>
  )
}
export default Contest;