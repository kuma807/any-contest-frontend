import {Link, useHistory} from "react-router-dom";
import { Table, Button } from 'react-bootstrap';

const SelectContest = () => {
  const history = useHistory();
  const contests = JSON.parse(window.localStorage.getItem('creatingContests')) !== null ? JSON.parse(window.localStorage.getItem('creatingContests')): [];

  const handleClick = (event) => {
    event.preventDefault();
    history.push("/create_contest/tempName");
  }


  return (
    <>
    <h2 style={{paddingTop: 20}}>
      作成中のコンテスト
    </h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>contest name</th>
        </tr>
      </thead>
      <tbody>
        {
          contests.map((contest) => 
          <tr key={contest.name}>
            <td>
            <Link to={`/create_contest/${contest.name}`}>{contest.name}
            </Link>
            </td>
          </tr>
          )
        }
      </tbody>
    </Table>
    <div style={{paddingTop:20}}>
      <Button variant="outline-primary" block onClick={handleClick}>新しいコンテストを作る</Button>{' '}
    </div>
    </>
  )
}
export default SelectContest;