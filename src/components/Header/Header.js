import {Navbar, Nav } from 'react-bootstrap';
import {Link} from "react-router-dom";

import HeaderUser from "./HeaderUser";

const style = {
  padding: 5,
  color: "white",
}

const Header = ({user}) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" text="light">
      <Navbar.Brand href="/">Any Contest</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#" as="span">
          <Link style={style} to="/fields">contests</Link>
        </Nav.Link>
      </Nav>
      <Nav>
        <HeaderUser user={user} style={style} />
      </Nav>
    </Navbar>
  )
}

export default Header;