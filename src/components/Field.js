import { Table} from 'react-bootstrap';
import {Link } from "react-router-dom";
import {filterContests} from "../services/contests";
import { useState, useEffect } from "react";

const Field = ({fieldName}) => {
  const timeQuery = {
    fromTime: "2000-00-00 00:00:00",
    toTime: "2100-00-00 00:00:00"
  }
  const [contests, setcontests] = useState(null);
  useEffect(() => {
    filterContests(timeQuery).then(res => setcontests(res));
  },[]);
  if (contests === null) {
    return <p>Loading contests...</p>;
  }
  return (
    <div>
      <h2>{fieldName}</h2>
      <Table striped>
      <tbody>
        {
          contests.map(contest =>
          <tr key={contest.name}>
            <td>
              <Link to={`/contests/${contest.name}`}>
                {contest.name}
              </Link>
            </td>
          </tr>
          )
        }
      </tbody>
      </Table>
    </div>
  )
}
export default Field;