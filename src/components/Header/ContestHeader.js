import {Navbar, Nav } from 'react-bootstrap';
import {Link} from "react-router-dom";

const style = {
  padding: 5,
}

const ContestHeader = ({ contestName }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" text="light">
      <Nav className="mr-auto">
        <Nav.Link href="#" as="span">
          <Link to={`/contests/${contestName}`} style={style}>home</Link>
          <Link to={`/contests/${contestName}/problems`} style={style}>problems</Link>
          <Link to="/" style={style}>ranking</Link>
          <Link to="/" style={style}>submission</Link>
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default ContestHeader;