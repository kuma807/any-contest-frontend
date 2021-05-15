import { Card, Button, CardDeck } from 'react-bootstrap';
import { useHistory} from "react-router-dom";
import {getFields} from "../services/fields";
import { useState, useEffect } from "react";

const Fields = () => {
  const history = useHistory();

  const [fields, setFields] = useState([]);
  useEffect(() => {
    getFields().then(res => {
      setFields(res);
    });
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    history.push(`/fields/${event.target.name}`);
  }

  if (fields.length === 0) {
    return <p>Loading contests...</p>;
  }
  return (
    <>
    <h1>Contests</h1>
    <CardDeck>
    {
      fields.map((field) => {
        const name = field[0];
        const description = field[1];
        return (
          <Card style={{ width: '16rem' }} key={name}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                {description}
              </Card.Text>
              <Button name={name} variant="primary" onClick={handleClick}>コンテスト一覧へ</Button>
            </Card.Body>
          </Card>
        )
      }
    )}
    </CardDeck>
    </>
  );
}
export default Fields;