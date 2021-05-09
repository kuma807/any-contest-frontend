import SimpleInput from "./SimpleInput";

const JudgeForm = ({judgeType}) => {
  if (judgeType === "SimpleInput") {
    return <SimpleInput />;
  }
  else {
    return <div>error</div>;
  }
}

export default JudgeForm;