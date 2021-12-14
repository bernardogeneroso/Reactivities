import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import useStore from "../../app/stores/useStore";

import { Container, Content } from "./styles";

export default observer(function Home() {
  const { userStore } = useStore();
  const { isLoggedIn } = userStore;

  return (
    <Container>
      <h1>
        <img src="/assets/logo.png" alt="logo" />
        Reactivities
      </h1>
      <Content {...{ isLoggedIn }}>
        {isLoggedIn ? (
          <>
            <h2>Welcome to Reactivities</h2>

            <Link to="/activities">
              <button>Go to Activities</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </Content>
    </Container>
  );
});
