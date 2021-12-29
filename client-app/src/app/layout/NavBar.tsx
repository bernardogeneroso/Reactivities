import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Image } from "semantic-ui-react";

import Button from "../components/Button";
import useStore from "../stores/useStore";

import { Container } from "../styles/NavBar";

export default observer(function Navbar() {
  const location = useLocation();
  const { userStore } = useStore();
  const { user, isLoggedIn, logout } = userStore;

  return (
    <Container>
      <nav>
        <Link to="/">
          <div className="activities">
            <img src="/assets/logo.png" alt="logo" />
            Reactivities
          </div>
        </Link>
        {isLoggedIn && (
          <>
            <div className="menu">
              <div className="cover">
                <Link
                  to="/activities"
                  className={
                    location.pathname === "/activities" ? "active" : ""
                  }
                >
                  Activities
                </Link>
              </div>
              <div className="cover">
                <Link
                  to="/errors"
                  className={location.pathname === "/errors" ? "active" : ""}
                >
                  Errors
                </Link>
              </div>
              <div className="cover">
                <Link to="/createActivity">
                  <Button situation="positive">Create Activity</Button>
                </Link>
              </div>
            </div>

            {user && (
              <div className="user">
                <Image
                  src={user?.image || "/assets/user.png"}
                  alt={user?.userName}
                  avatar
                  spaced="right"
                  className="user-image"
                />
                <Dropdown pointing="top left" text={user?.displayName}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to={`/profiles/${user?.userName}`}
                      text="My profile"
                      icon="user"
                    />
                    <Dropdown.Item
                      onClick={logout}
                      text="Logout"
                      icon="power"
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </>
        )}
      </nav>
    </Container>
  );
});
