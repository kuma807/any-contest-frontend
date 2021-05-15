import {Nav } from 'react-bootstrap';
import {Link} from "react-router-dom";

const ContestHeader = ({ contestName, active }) => {
  return (
    <Nav variant="tabs" defaultActiveKey={`/contests/${contestName}`}>
      <Nav.Link href={`/contests/${contestName}`} active={active==="home"}>home</Nav.Link>
      <Nav.Link href={`/contests/${contestName}/problems`} active={active==="problems"}>problems</Nav.Link>
      <Nav.Link href={`/contests/${contestName}/ranking`} active={active==="ranking"}>ranking</Nav.Link>
      <Nav.Link href={`/contests/${contestName}/submissions`} active={active==="submissions"}>submissions</Nav.Link>
    </Nav>
  )
}

export default ContestHeader;