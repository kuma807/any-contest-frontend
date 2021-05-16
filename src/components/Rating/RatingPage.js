import { Table, Container, Badge } from 'react-bootstrap';
import { useState, useEffect } from "react";
import {getUserRating} from "../../services/rating";

const RatingPage = () => {

  const [rating, setRating] = useState(null);
  const storage = JSON.parse(window.localStorage.getItem('loggedUser'));
  useEffect(() => {
    if (storage !== null) {
      const userid = storage.userid;
      getUserRating(userid)
        .then(res => {
          console.log(res);
          setRating(res);
      });
    }
  }, []);

  if (rating === null) {
    return (
      <div>
      Loading contests...
      </div>
    )
  }
  if (rating.length === 0) {
    return (
      <div>
      ユーザー登録してください
      </div>
    )
  }
  return (
    <div>
    {
      rating.map((rate) => 
        <div key={rate.fieldName}>
        <h1>{rate.fieldName}</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>contest</th>
              <th>rating</th>
            </tr>
          </thead>
          <tbody>
          {
            rate.ratingData.map((datum, index) => 
              <tr key={datum.contestName}>
                <td>{datum["contestName"]}</td>
                <td>{Math.floor(datum["rating"])}</td>
              </tr>
            )
          }
          </tbody>
        </Table>
        </div>
      )
    }
    </div>
  )
}

export default RatingPage;