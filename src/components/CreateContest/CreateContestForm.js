import { Form, Button, Col, Table, Alert } from 'react-bootstrap';
import { useHistory, Link} from "react-router-dom";
import {filterContests} from "../../services/contests";
import { useState, useEffect } from "react";
import checkContest from "../../services/CreateContest/checkContest";
import saveData from "../../services/CreateContest/saveData";
import {makeContest} from "../../services/contests";
import uploadProblem from "../../services/CreateContest/uploadProblem";

const CreateContest = ({contestName, setMessage}) => {
  const [contestAlreadyCreated, setContestAlreadyCreated] = useState(null);
  
  useEffect(() => {
    filterContests({fromTime: "2000-01-01 00:00:00", toTime: "2100-01-01 00:00:00"}).then(res => {
      setContestAlreadyCreated(res.map(r => r.name))
    });
  }, []);

  const history = useHistory();
  const [contests, setContests] = useState(JSON.parse(window.localStorage.getItem('creatingContests')) !== null ? JSON.parse(window.localStorage.getItem('creatingContests')): []);
  const [contest, setContest] = useState(contests.filter(contest => contest.name === contestName).length === 0 ? {problemNames: []}: contests.filter(contest => contest.name === contestName)[0]);

  const handlePost = ({event, newContest}) => {
    checkContest({contest: newContest, contestAlreadyCreated, setMessage}).then(res => {
      console.log(res);
      if (res) {
        makeContest(newContest);
        newContest.problemNames.forEach(problemName => {
          uploadProblem(problemName);
        });
        history.push(`/fields/Debug`);
      }
    });
  }

  const handleClick = (event) => {
    event.preventDefault();
    const problemName = event.target.value;
    const newProblems = JSON.parse(window.localStorage.getItem('creatingProblems')).filter(problem => problem.name !== problemName);
    window.localStorage.setItem(
      'creatingProblems', JSON.stringify(newProblems)
    );
    const newProblemNames = contest.problemNames.filter(name => name !== problemName);
    const newContest = {...contest, problemNames: newProblemNames};
    setContest(newContest);
    const newContests = contests.map(contest => {
      if (contest.problemNames.filter(name => name === problemName).length !== 0) {
        return newContest;
      }
      return contest;
    })
    setContests(newContests);
    window.localStorage.setItem(
      'creatingContests', JSON.stringify(newContests)
    );
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const newContest = saveData({event, contest, contests, setContests, setContest});
    const innerHTML = event.nativeEvent.submitter.innerHTML;
    if (innerHTML === "?????????????????????") {
      history.push(`/create_problem/`);
    }
    if (innerHTML === "??????????????????????????????") {
      handlePost({event, newContest});
    }
  }


  return (
    <>
    <Form style={{paddingTop: 20}} onSubmit={onSubmit}>
      <Form.Group controlId="contestName">
        <Form.Label>??????????????????</Form.Label>
        <Form.Control type="text" placeholder="??????????????????" defaultValue={contest.name} />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>??????</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="????????????????????????" defaultValue={contest.description} />
      </Form.Group>
      <Form.Label>????????????</Form.Label>
      <Form.Row>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="2021" defaultValue={contest.startTime ? contest.startTime.substring(0, 4): null} />
        </Col>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="4" defaultValue={contest.startTime ? contest.startTime.substring(5, 7): null} />
        </Col>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="1" defaultValue={contest.startTime ? contest.startTime.substring(8, 10): null} />
        </Col>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="9" defaultValue={contest.startTime ? contest.startTime.substring(11, 13): null} />
        </Col>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="0" defaultValue={contest.startTime ? contest.startTime.substring(14, 16): null} />
        </Col>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="0" defaultValue={contest.startTime ? contest.startTime.substring(17, 19): null} />
        </Col>
      </Form.Row>
      <Form.Label style={{paddingTop: 20}}>????????????</Form.Label>
      <Form.Row>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="2021" defaultValue={contest.endTime ? contest.endTime.substring(0, 4): null} />
        </Col>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="4" defaultValue={contest.endTime ? contest.endTime.substring(5, 7): null} />
        </Col>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="1" defaultValue={contest.endTime ? contest.endTime.substring(8, 10): null} />
        </Col>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="9" defaultValue={contest.endTime ? contest.endTime.substring(11, 13): null} />
        </Col>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="0" defaultValue={contest.endTime ? contest.endTime.substring(14, 16): null} />
        </Col>
        <Col>
          <Form.Label column="sm" lg={2}>???</Form.Label>
          <Form.Control placeholder="0" defaultValue={contest.endTime ? contest.endTime.substring(17, 19): null} />
        </Col>
      </Form.Row>
      <div style={{paddingTop:20}}>
        <Table striped bordered hover>
          <tbody>
            {
              contest.problemNames.map((problem) => 
              <tr key={problem}>
                <td>
                <Link to={`/create_problem/${problem}`}>{problem}
                </Link>
                </td>
                <td>
                <Button variant="outline-danger" value={problem} onClick={handleClick}>
                  ??????
                </Button>
                </td>
              </tr>
              )
            }
          </tbody>
        </Table>
      </div>

      <Button variant="primary" type="submit">
        ?????????????????????
      </Button>
      <div style={{float: 'right'}}>
        <Alert variant="warning">
          *?????????????????????????????????????????????????????????????????????????????????
        </Alert>
        <Button variant="primary" type="submit">
          ??????????????????????????????
        </Button>
      </div>
    </Form>
    </>
  )
}
export default CreateContest;