import { Link } from "react-router-dom";

import Button from "../components/Button";

import { Container } from "../styles/NavBar";

export default function Navbar() {
  return (
    <Container>
      <nav>
        <Link to="/">
          <div className="activities">
            <img src="/assets/logo.png" alt="logo" />
            Reactivities
          </div>
        </Link>
        <div className="menu">
          <div className="cover">
            <Link to="/activities">Activities</Link>
          </div>
          <div className="cover">
            <Link to="/errors">Errors</Link>
          </div>
          <div className="cover">
            <Link to="/createActivity">
              <Button situation="positive">Create Activity</Button>
            </Link>
          </div>
        </div>
      </nav>
    </Container>
  );
}
