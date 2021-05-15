import { Table, Container, Badge } from 'react-bootstrap';
import {getUserSubmission} from "../../services/submission";
import { useState, useEffect } from "react";
import ContestHeader from "../Header/ContestHeader";

const MySubmissions = ({contestName}) => {

  const [submissions, setSubmissions] = useState(null);
  useEffect(() => {
    getUserSubmission()
      .then(res => {
        setSubmissions(res.filter((submission => submission.contestName === contestName)).reverse());
      });
  }, []);

  if (submissions === null) {
    return (
      <div>
      Loading contests...
      </div>
    )
  }
  if (submissions.length === 0) {
    return (
      <div>
      提出はありません
      </div>
    )
  }
  return (
    <Container>
      <Table bordered hover>
        <thead>
          <tr>
            <th>problem</th>
            <th>answer</th>
            <th>state</th>
            <th>time</th>
          </tr>
        </thead>
        <tbody>
          {
            submissions.map((submission, index) => 
              <tr key={index} className={index === 0 ? (submission["state"]==="OK"? "table-success": "table-danger"): "table-light"}>
                <td>{submission["problemName"]}</td>
                <td>{submission["answer"]}</td>
                <td><Badge variant={submission["state"]==="OK"? "success": "danger"} > {submission["state"]} </Badge> </td>
                <td>{submission["time"]}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </Container>
  )
}

export default MySubmissions;