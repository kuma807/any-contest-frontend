import { Table} from 'react-bootstrap';

const RatingTable = ({rate}) => {
  return (
    <>
    <Table bordered hover>
    <thead>
      <tr>
        <th>num</th>
        <th>contest</th>
        <th>performance</th>
        <th>rating</th>
      </tr>
    </thead>
    <tbody>
      {
        rate.ratingData.map((datum, index) => {
          return (
            <tr key={datum.contestName}>
              <td>{rate.ratingData.length - index}</td>
              <td>{datum["contestName"]}</td>
              <td>{rate.revPref[index]}</td>
              <td>{rate.revRate[index]}</td>
            </tr>
          )
        })
      }
    </tbody>
    </Table>
    </>
  )
}
export default RatingTable;