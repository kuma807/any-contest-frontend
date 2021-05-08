import {Nav } from 'react-bootstrap';
import {Link} from "react-router-dom";

const HeaderUser = ({ user, style }) => {
  if (user.name) {
    return (
      <em style={style}>{user.name}</em>
    );
  }
  else {
    return (
      <Nav.Link href="#" as="span">
        <Link to="/signup" style={style}>signup</Link>
        <Link to="/login" style={style}>login</Link>
      </Nav.Link>
    );
  }
}
export default HeaderUser;