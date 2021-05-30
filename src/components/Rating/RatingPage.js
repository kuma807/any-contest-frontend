import { Dropdown, Form } from 'react-bootstrap';
import { useState, useEffect } from "react";
import {getUserRating} from "../../services/rating";
import RatingTable from "./RatingTable";
import RatingGraph from "./RatingGraph";

const RatingPage = ({userName}) => {
  console.log(userName);
  const storage = JSON.parse(window.localStorage.getItem('loggedUser'));
  const [rating, setRating] = useState(null);
  const [rate, setRate] = useState(null);
  const [userid, setUserid] = useState(userName ? userName : (storage ? storage.userid: ""));
  const onChange = (event) => {
    event.preventDefault();
    setUserid(event.target.value);
  }
  useEffect(() => {
    if (userid !== "") {
      getUserRating(userid)
        .then(res => {
          res.map((r) => {
            const revRateData = r.ratingData.slice().reverse();
            const revPref = [];
            const revRate = [];
            for (let index = revRateData.length - 1; index >= 0; index--) {
              const datum = revRateData[index];
              if (index === revRateData.length - 1) {
                const pref = Math.floor((parseInt(datum["rating"]) + 400) * 4 - (1500 + 400) * 3);
                const rating = Math.floor(Math.max(datum.rating * (revRateData.length - index) / 5, Math.min(datum.rating, Math.max(0, pref / 4) + 400 / 5)));
                revPref.push(pref);
                revRate.push(rating);
              }
              else if (index >= revRateData.length - 5) {
                const pref = Math.floor((parseInt(datum["rating"]) + 400) * 4 - (parseInt(revRateData[index + 1]["rating"]) + 400) * 3);
                const rating = Math.floor(Math.max(datum.rating * (revRateData.length - index) / 5, Math.min(datum.rating, Math.max(0, (pref + revRate[revRate.length - 1] * 3) / 4) + 400 * (revRateData.length - index) / 5)));
                revPref.push(pref);
                revRate.push(rating);
              }
              else {
                const pref = Math.floor(parseInt(datum["rating"]) * 4 - parseInt(revRateData[index + 1]["rating"]) * 3) + 400;
                const rating = Math.floor(datum.rating) + 400;
                revPref.push(pref);
                revRate.push(rating);
              }
            }
            revPref.reverse();
            revRate.reverse();
            r.revPref = revPref;
            r.revRate = revRate;
            return r;
          })
          if (res.length !== 0) {
            setRating(res);
            setRate(res[0]);
          }
      });
    }
  }, [userid]);

  if (rating === null || rate === null) {
    return (
      <div style={{paddingTop: 20}}>
      <Form>
        <Form.Label>userid</Form.Label>
        <Form.Control defaultValue={userid} onChange={onChange}/>
      </Form>
    </div>
    )
  }
  if (rating.length === 0) {
    return (
      <div style={{paddingTop: 20}}>
      <Form>
        <Form.Label>userid</Form.Label>
        <Form.Control defaultValue={userid} onChange={onChange}/>
      </Form>
    </div>
    )
  }

  const handleClick = (num) => {
    let newRate = rating[num];
    setRate(newRate);
  }

  return (
    <>
    <div style={{paddingTop: 20}}>
      <Form>
        <Form.Label>userid</Form.Label>
        <Form.Control defaultValue={userid} onChange={onChange}/>
      </Form>
    </div>
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        コンテストを選ぶ
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          rating.map((rate, index) => {
            return (
              <Dropdown.Item onClick={() => handleClick(index)} key={rate.fieldName}> {rate.fieldName} </Dropdown.Item>
            )
          })
        }
      </Dropdown.Menu>
    </Dropdown>
    <h1>{rate.fieldName}</h1>
    <RatingGraph rate={rate} />
    <RatingTable rate={rate} />
    </>
  )
}

export default RatingPage;