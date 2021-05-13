import { Table} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {getFieldNames} from "../services/fields";
import { useState, useEffect } from "react";

const Fields = () => {
  const [fieldNames, setFieldNames] = useState([]);
  useEffect(() => {
    getFieldNames().then(res => setFieldNames(res));
  }, []);
  if (fieldNames.length === 0) {
    return <p>Loading contests...</p>;
  }
  return (
    <>
    <h1>Contests</h1>
    <Table striped>
    <tbody>
      {fieldNames.map(name =>
        <tr key={name}>
          <td>
            <Link to={`/fields/${name}`}>
              {name}
            </Link>
          </td>
        </tr>
      )}
    </tbody>
    </Table>
    </>
  );
}
export default Fields;