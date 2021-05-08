import { Table} from 'react-bootstrap';
import {Link} from "react-router-dom";

const fields = [
  {
    name: "math"
  },
  {
    name: "programe"
  },
  {
    name: "quize"
  }
]

const Fields = () => {
  return (
  <Table striped>
  <tbody>
    {fields.map(field =>
      <tr key={field.name}>
        <td>
          <Link to={`/fields/${field.name}`}>
            {field.name}
          </Link>
        </td>
      </tr>
    )}
  </tbody>
  </Table>
  );
}
export default Fields;