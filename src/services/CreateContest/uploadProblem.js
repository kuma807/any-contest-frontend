import {createProblem} from "../problems";
import {createAnswer} from "../answers";

const uploadProblem = async (problemName) => {
  const Data = JSON.parse(window.localStorage.getItem('creatingProblems')).filter(problem => problem.name === problemName)[0];
  const problemData = {
    name: Data.name,
    point: Data.point,
    writer: Data.writer,
    contest: Data.contest,
    problemStatement: Data.problemStatement,
    judgeType: Data.judgeType
  };
  const answerData = {
    name: Data.name,
    answer: Data.answer
  }
  await createProblem(problemData);
  await createAnswer(answerData);
}

export default uploadProblem;