import { Form, Button, Dropdown } from 'react-bootstrap';
import { useState } from "react";
import { useHistory} from "react-router-dom";

const CreateProblem = ({problemName}) => {
  const history = useHistory();
  const [contests, setContests] = useState(JSON.parse(window.localStorage.getItem('creatingContests')) !== null ? JSON.parse(window.localStorage.getItem('creatingContests')): []);
  const [problems, setProblems] = useState(JSON.parse(window.localStorage.getItem('creatingProblems')) !== null ? JSON.parse(window.localStorage.getItem('creatingProblems')): []);

  const filteredProblems = problems.filter(problem => problem.name === problemName);
  const problem = filteredProblems.length === 0 ? {}: filteredProblems[0];
  const [contestName, setContestName] = useState('コンテストを選ぶ');

  const handleClick = (event) => {
    event.preventDefault();
    setContestName(event.target.text.substring(1, event.target.text.length - 1));
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const problemName = event.target[0].value;
    const problemStatement = event.target[1].value;
    const answer = event.target[2].value;
    const point = event.target[3].value;
    const newProblem = {
      name: problemName,
      point: parseInt(point), 
      writer: JSON.parse(window.localStorage.getItem('loggedUser'))['name'],
      contest: contestName,
      answer: answer,
      problemStatement: problemStatement,
      judgeType: 'SimpleInput',
    }
    const already = problems.filter(problem => problem.name === problemName).length !== 0;
    console.log(already);
    if (already) {
      const newProblems = problems.map(problem => {
        if (problem.name === problemName) {
          return newProblem;
        }
        return problem;
      });
      setProblems(newProblems);
      window.localStorage.setItem(
        'creatingProblems', JSON.stringify(newProblems)
      );
    }
    else {
      const newProblems = problems.concat([newProblem]);
      setProblems(newProblems);
      window.localStorage.setItem(
        'creatingProblems', JSON.stringify(newProblems)
      );
    }
    
    const newContests = contests.map((contest) => {
      if (contest.name === contestName) {
        if (contest.problemNames.filter(prob => prob === problemName).length === 0) {
          contest.problemNames.push(problemName);
        }
      }
      return contest;
    });
    setContests(newContests);
    window.localStorage.setItem(
      'creatingContests', JSON.stringify(newContests)
    );
    history.push(`/create_contest/${contestName}`);
  }

  return (
    <>
    <div style={{paddingTop: 20}}>
      コンテスト名
    </div>
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {contestName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
          contests.map((contest, index) => {
            return (
              <Dropdown.Item onClick={handleClick} key={contest.name}> {contest.name} </Dropdown.Item>
            )
          })
        }
      </Dropdown.Menu>
    </Dropdown>
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="problemName">
        <Form.Label>問題名</Form.Label>
        <Form.Control placeholder="50文字以下" defaultValue={problemName} />
      </Form.Group>
      <Form.Group controlId="problemStatement">
        <Form.Label>問題文</Form.Label>
        <Form.Control as="textarea" row={3} placeholder="1000文字以下" defaultValue={problem.problemStatement} />
      </Form.Group>
      <Form.Group controlId="answer">
        <Form.Label>答え</Form.Label>
        <Form.Control as="textarea" row={3} placeholder="500文字以下" defaultValue={problem.answer} />
      </Form.Group>
      <Form.Group controlId="point">
        <Form.Label>点数</Form.Label>
        <Form.Control placeholder="1〜3000の間" defaultValue={problem.point} />
      </Form.Group>

      <Button variant="primary" type="submit">
        問題を追加
      </Button>
    </Form>
    </>
  )
}
export default CreateProblem;