import React from "react";
import { Link } from "react-router-dom";

import { Container } from "./styles";

export default function Home() {
  return (
    <Container>
      <h1>Home page</h1>
      <h3>
        Go to <Link to="/activities">Activities</Link>
      </h3>
    </Container>
  );
}
