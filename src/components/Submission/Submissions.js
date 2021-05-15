import {Alert } from 'react-bootstrap';
import ContestHeader from "../Header/ContestHeader";
import MySubmissions from "./MySubmissions";

const Submissions = ({contestName}) => {
  return (
    <div>
      <ContestHeader contestName={contestName} active="submissions"/>
      <Alert variant="danger">
        現在自分の提出しか見られない仕様になっています。
      </Alert>
      <MySubmissions contestName={contestName} />
    </div>
  )
}

export default Submissions;