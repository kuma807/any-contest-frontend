import {Jumbotron, Button } from 'react-bootstrap';
import { useHistory} from "react-router-dom";

const HomeForm = () => {
  const history = useHistory();
  const handleClick = (event) => {
    event.preventDefault();
    history.push(`/fields`);
  }
  return (
    <Jumbotron>
      <h1>Any Contest</h1>
      <p>
        このサイトでは様々なジャンルのコンテストを開催する予定です。早速ジャンル一覧を見てください！
      </p>
      <p>
        <Button variant="primary" onClick={handleClick}>ジャンル一覧へ</Button>
      </p>
    </Jumbotron>
  )
}

export default HomeForm;