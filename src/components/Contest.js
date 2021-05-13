import ContestHeader from "./Header/ContestHeader";
import {getContest} from "../services/contests";
import { useState, useEffect } from "react";

const Contest = ({ contestName }) => {
  const [contest, setcontest] = useState(null);
  useEffect(() => {
    getContest(contestName).then(res => setcontest(res[0]));
  },[]);
  if (contest === null) {
    return <p>Loading contests...</p>;
  }
  return (
    <div>
      <ContestHeader contestName={contestName} />
      <h2>{contest.name}</h2>
      <div>{contest.description}</div>
    </div>
  )
}
export default Contest;