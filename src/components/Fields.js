import { Table} from 'react-bootstrap';
import {Link} from "react-router-dom";

const Fields = ({fields}) => (
  <Table striped>
  <tbody>
    {fields.map(field =>
      <tr key={field.id}>
        <td>
          <Link to={`/fields/${field.name}`}>
            {field.name}
          </Link>
        </td>
      </tr>
    )}
  </tbody>
</Table>
)

export default Fields;