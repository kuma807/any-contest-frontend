import {Link} from "react-router-dom";
import { Table, Container} from 'react-bootstrap';

import ContestHeader from "./Header/ContestHeader";

const temp_problem = [
  {
    name: "problem1",
    writer: "user1"
  },
  {
    name: "problem2",
    writer: "user1"
  }
]

const Problems = ({ contestName }) => {
  const problems = temp_problem;
  return (
    <div>
    <ContestHeader contestName={contestName} />
    <Table bordered>
    <thead>
      <tr>
        <th scope="col"> </th>
        <th scope="col">問題名</th>
      </tr>
    </thead>
    <tbody>
      {problems.map((problem, index) =>
        <tr key={problem.name}>
          <th scope="row">{index}</th>
          <td>
            <Link to={`/problems/${problem.name}`}>
              {problem.name}
            </Link>
          </td>
        </tr>
      )}
    </tbody>
    </Table>
    </div>
  )
}
export default Problems;