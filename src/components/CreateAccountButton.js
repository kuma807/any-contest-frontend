import {Button } from 'react-bootstrap';
import { useHistory} from "react-router-dom";

const CreateAccountButton = () => {
  const history = useHistory();
  const handleClick = (event) => {
    event.preventDefault();
    history.push(`/signup`);
  }
  return (
    <Button variant="primary" onClick={handleClick}>
      ユーザー登録する
    </Button>
  )
}

export default CreateAccountButton;