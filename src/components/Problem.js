import ContestHeader from "./Header/ContestHeader";
import JudgeForm from "./Judge/JudgeForm";

const tempproblem = {
  name: "problem1",
  writer: "user1",
  contestName: "math1",
  problemStatement: "whats 1 + 1",
  judgeType: "SimpleInput"
}

const Problem = ({problemName}) => {
  const problem = tempproblem;
  return (
    <div>
      <ContestHeader contestName={problem.contestName} />
      <h1>
        {problem.name}
      </h1>
      {problem.problemStatement}
      <JudgeForm judgeType={problem.judgeType} />
    </div>
  )
}

export default Problem;