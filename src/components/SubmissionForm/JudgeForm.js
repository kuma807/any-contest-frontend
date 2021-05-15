import SimpleInput from "./SimpleInput";

const JudgeForm = ({judgeType, contestName, problemName}) => {
  if (judgeType === "SimpleInput") {
    return <SimpleInput contestName={contestName} problemName={problemName}/>;
  }
  else {
    return <div>error</div>;
  }
}

export default JudgeForm;