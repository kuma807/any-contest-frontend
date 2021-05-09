import {Navbar, Nav } from 'react-bootstrap';
import {Link} from "react-router-dom";

const style = {
  padding: 5,
}

const ContestHeader = ({ contestName }) => {
  return (
    <Nav variant="tabs" defaultActiveKey={`/contests/${contestName}`}>
      <Nav.Item>
        <Nav.Link>
          <Link to={`/contests/${contestName}`} style={style}>home</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Link to={`/contests/${contestName}/problems`} style={style}>problems</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Link to={`/contests/${contestName}/ranking`} style={style}>ranking</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Link to={`/contests/${contestName}/submissions`} style={style}>submissions</Link>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default ContestHeader;