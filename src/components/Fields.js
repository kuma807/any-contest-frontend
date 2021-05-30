import { Card, Button, CardDeck } from 'react-bootstrap';
import { useHistory} from "react-router-dom";
import {getFields} from "../services/fields";
import { useState, useEffect } from "react";

const Fields = () => {
  const history = useHistory();
  const [isLogedIn, setIsLogedIn] = useState(false);

  const [fields, setFields] = useState([]);
  useEffect(() => {
    getFields().then(res => {
      setFields(res);
    });
    const storage = JSON.parse(window.localStorage.getItem('loggedUser'));
    if (storage !== null) {
      setIsLogedIn(true);
    }
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    history.push(`/fields/${event.target.name}`);
  }

  const makeContest = (event) => {
    event.preventDefault();
    history.push("/create_contest");
  }

  const makeAccount = (event) => {
    event.preventDefault();
    history.push("/signup");
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
    {isLogedIn &&
      <div style={{paddingTop:20}}>
        <Button onClick={makeContest} variant="outline-primary" block>コンテストを作る</Button>{' '}
      </div>
    }
    {!isLogedIn &&
      <div style={{paddingTop:20}}>
        <Button onClick={makeAccount} variant="outline-primary" block>コンテストを作る</Button>{' '}
      </div>
    }
    </>
  );
}
export default Fields;