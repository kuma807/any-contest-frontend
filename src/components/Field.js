import { Table} from 'react-bootstrap';
import {Link } from "react-router-dom";

const fields = [
  {
    name: "math",
    description: "数学のコンテスト",
    contests: [
      {
        name: "math1"
      },
      {
        name: "superMath"
      }
    ]
  },
  {
    name: "programe",
    description: "競プロのコンテスト"
  },
  {
    name: "quize",
    description: "クイズのコンテスト"
  }
]

const Field = ({fieldName}) => {
  const field = fields.find((f) => f.name === fieldName);
  return (
    <div>
      <h2>{field.name}</h2>
      <div>{field.description}</div>
      <Table striped>
      <tbody>
        {
          field.contests.map(contest =>
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