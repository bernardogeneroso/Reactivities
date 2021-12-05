import React from "react";

import Button from "../components/Button";

import { Container } from "../styles/NavBar";

interface NavBarProps {
  handleOpenFormEdit: () => void;
}

export default function Navbar({ handleOpenFormEdit }: NavBarProps) {
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
            <Button situation="positive" onClick={() => handleOpenFormEdit()}>
              Create Activity
            </Button>
          </div>
        </div>
      </nav>
    </Container>
  );
}
