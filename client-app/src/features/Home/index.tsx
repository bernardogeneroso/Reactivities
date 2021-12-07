import React from "react";
import { Link } from "react-router-dom";

import { Container } from "./styles";

export default function Home() {
  return (
    <Container>
      <h1>
        <img src="/assets/logo.png" alt="logo" />
        Reactivities
      </h1>
      <div className="content">
        <h2>Welcome to Reactivities</h2>

        <Link to="/activities">
          <button>Take me to the Activities!</button>
        </Link>
      </div>
    </Container>
  );
}
