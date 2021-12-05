import React from "react";

import Button from "../components/Button";
import useStore from "../stores/useStore";

import { Container } from "../styles/NavBar";

export default function Navbar() {
  const { activityStore } = useStore();

  return (
    <Container>
      <nav>
        <div className="activities">
          <img src="/assets/logo.png" alt="logo" />
          Reactivities
        </div>
        <div className="menu">
          <div className="cover">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">Activities</a>
          </div>
          <div className="cover">
            <Button
              situation="positive"
              onClick={() => activityStore.openForm()}
            >
              Create Activity
            </Button>
          </div>
        </div>
      </nav>
    </Container>
  );
}
