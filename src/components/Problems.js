import {Link} from "react-router-dom";
import { Table, Container} from 'react-bootstrap';
import {getContest} from "../services/contests";
import { useState, useEffect } from "react";

import ContestHeader from "./Header/ContestHeader";

const Problems = ({ contestName }) => {
  const [problemNames, setProblemNames] = useState(null);
  useEffect(() => {
    getContest(contestName).then(res => setProblemNames(res[0]["problemNames"]));
  },[]);
  if (problemNames === null) {
    return <p>Loading contests...</p>;
  }
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
      {problemNames.map((name, index) =>
        <tr key={name}>
          <th scope="row">{index}</th>
          <td>
            <Link to={`/problems/${name}`}>
              {name}
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