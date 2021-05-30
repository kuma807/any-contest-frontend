import { Form, Button } from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import {submit} from "../../services/submission";
import { useState, useEffect } from "react";
import CreateAccountButton from "../CreateAccountButton";


const SimpleInput = ({contestName, problemName}) => {
  const history = useHistory();
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [typedString, setTypedString] = useState("");

  useEffect(() => {
    const storage = JSON.parse(window.localStorage.getItem('loggedUser'));
    if (storage !== null) {
      setIsLogedIn(true);
    }
  },[]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const answer = event.target[0].value;

    try {
      const submission = await submit({
        problemName: problemName,
        contestName: contestName,
        answer: answer
      });
      history.push(`/contests/${contestName}/submissions`);
    }
    catch (exception) {
      console.log("err");
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <h4 style={{paddingTop: 400, marginTop: 400}}>入力欄</h4>
        <Form.Control as="textarea" rows={1} />
        {isLogedIn &&
          <Button variant="primary" type="submit">
              提出
          </Button>
        }
        {!isLogedIn &&
          <CreateAccountButton />
        }
      </Form.Group>
    </Form>
  )
}

export default SimpleInput;