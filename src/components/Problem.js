import ContestHeader from "./Header/ContestHeader";
import JudgeForm from "./SubmissionForm/JudgeForm";
import {getProblem} from "../services/problems";
import { useState, useEffect } from "react";

const style = {
  fontWeight: "bold"
}

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
      <span>
        <h2 style={style}>
          {problem.name}
        </h2>
        <hr />
      </span>
      <section>
        <span>
          <h3 style={style}>
            問題文
          </h3>
        </span>
        <span>
          {problem.problemStatement}
        </span>
      </section>
      <JudgeForm judgeType={problem.judgeType} contestName={problem.contest} problemName={problemName}/>
    </div>
  )
}

export default Problem;