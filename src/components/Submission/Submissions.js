import ContestHeader from "../Header/ContestHeader";
import MySubmissions from "./MySubmissions";

const Submissions = ({contestName}) => {
  return (
    <div>
      <ContestHeader contestName={contestName} />
      <MySubmissions contestName={contestName} />
    </div>
  )
}

export default Submissions;