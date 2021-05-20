import ContestHeader from "./Header/ContestHeader";
import JudgeForm from "./SubmissionForm/JudgeForm";
import {getProblem} from "../services/problems";
import { useState, useEffect } from "react";

const Problem = ({problemName}) => {
  const [problem, setProblem] = useState(null);
  useEffect(() => {
    getProblem(problemName).then(res => setProblem(res[0]));
  },[]);
  if (problem === null) {
    return <p>Loading contests...</p>;
  }
  return (
    <div>
      <ContestHeader contestName={problem.contest} />
      <h1>
        {problem.name}
      </h1>
      <h4>
        以下の問題分を入力欄に打ち込んでください。
      </h4>
      {problem.problemStatement}
      <JudgeForm judgeType={problem.judgeType} contestName={problem.contest} problemName={problemName}/>
    </div>
  )
}

export default Problem;