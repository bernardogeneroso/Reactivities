import React from "react";

import Button from "../components/Button";

import { Container } from "../styles/NavBar";

export default function Navbar() {
  return (
    <Container>
      <nav>
        <div className="activities">
          <img src="/assets/logo.png" alt="logo" />
          Reactivities
        </div>
        <div className="menu">
          <div className="cover">
            <a href="#">Activities</a>
          </div>
          <div className="cover">
            <Button positive>Create Activity</Button>
          </div>
        </div>
      </nav>
    </Container>
  );
}
