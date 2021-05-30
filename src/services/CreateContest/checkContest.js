import {getProblem} from "../problems";

const checkField = (field) => field === "Debug";

const checkContestName = ({contestName, contestAlreadyCreated}) => {
  if (!contestName || contestName.length === 0) {
    return false;
  }
  return contestAlreadyCreated.filter(name => name === contestName).length === 0;
}

const checkDescription = (description) => (description && description.length !== 0);

const checkDate = (day) => {
  if (!day) {
    return false;
  }
  if (day.length !== 19) {
    return false;
  }
  if (!Date.parse(day)) {
    return false;
  }
  if (day < "2021-04-01 00:00:00" || "2025-04-01 00:00:00" < day) {
    return false;
  }
  return true;
}

const checkProblems = (problemNames) => (problemNames && problemNames.length !== 0);

const checkProblem = ({problemName, contestName}) => {
  const problem = JSON.parse(window.localStorage.getItem('creatingProblems')).filter(problem => problem.name === problemName)[0];
  if (!problem.answer || problem.answer.length === 0) {
    return false;
  }
  else if (!problem.contest || problem.contest !== contestName) {
    return false;
  }
  else if (!problem.judgeType) {
    return false;
  }
  else if (!problem.name || problem.name.length === 0) {
    return false;
  }
  else if (!problem.point || problem.point < 1|| 3000 < problem.point) {
    return false;
  }
  else if (!problem.problemStatement || problem.problemStatement.length === 0) {
    return false;
  }
  else if (!problem.writer || problem.writer.length === 0) {
    return false;
  }
  return true;
}

const checkContest = async ({contest, contestAlreadyCreated, setMessage}) => {
  if (!checkField(contest.field)) {
    setMessage(`Error: Debug以外の分野にコンテストは追加出来ません`);
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }
  else if (!checkContestName({contestName: contest.name, contestAlreadyCreated})) {
    setMessage(`Error: コンテスト名が設定されていないか、すでに存在するコンテスト名です`);
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }
  else if (!checkField(contest.field)) {
    setMessage(`Error: Debug以外の分野にコンテストは追加出来ません`);
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }
  else if (!checkDescription(contest.description)) {
    setMessage(`Error: コンテストの説明が設定されていません`);
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }
  else if (!checkDate(contest.startTime) || !checkDate(contest.endTime)) {
    setMessage(`Error: 開始時間もしくは終了時間が正しく設定されていません`);
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }
  else if (!checkProblems(contest.problemNames)) {
    setMessage(`Error: 問題が一つも有りません`);
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }
  else {
    let problemsUnique = true;
    for (let index = 0; index < contest.problemNames.length; index++) {
      const problemName = contest.problemNames[index];
      if (!checkProblem({problemName, contestName: contest.name})) {
        setMessage(`Error: 問題${problemName}に不足の情報があります`);
        setTimeout(() => {
          setMessage(null)
        }, 10000);
        break;
      }
      const res = await getProblem(problemName);
      console.log(res);
      if (res !== "not found") {
        setMessage(`Error: 問題${problemName}がすでに存在するため名前を変えてください`);
        problemsUnique = false;
        setTimeout(() => {
          setMessage(null)
        }, 10000);
        break;
      }
    }
    if (problemsUnique) {
      return true;
    }
  }
  return false;
}

export default checkContest;