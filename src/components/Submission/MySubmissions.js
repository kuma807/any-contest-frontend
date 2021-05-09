import { Table, Container } from 'react-bootstrap';
import ContestHeader from "../Header/ContestHeader";

const tempsubmissions = [
  {
    submissionTime: "2021-05-09 09:49:45",
    task: "problem1",
    user: "user1",
    status: "NG"
  },
  {
    submissionTime: "2021-05-09 10:50:42",
    task: "problem1",
    user: "user1",
    status: "OK"
  }
]


const MySubmissions = ({contestName}) => {
  const submissions = tempsubmissions;
  const keys = submissions ? Object.keys(submissions[0]) : [];
  return (
    <Container>
      <Table bordered hover>
        <thead>
          <tr>
            {
              keys.map((key) => <th>{key}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            submissions.map((submission) => 
              <tr>
                {keys.map((key) => <td>{submission[key]}</td>)}
              </tr>
            )
          }
        </tbody>
      </Table>
    </Container>
  )
}

export default MySubmissions;