import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import useStore from "../stores/useStore";

import Loading from "../components/Loading";
import ActivityDashboard from "../../features/activities";
import ActivityForm from "../../features/activities/ActivityForm";
import ActivityDetails from "../../features/activities/ActivityDetails";
import Home from "../../features/Home";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import Profile from "../../features/profiles";
import Navbar from "./NavBar";

import { Container, Background, Content } from "../styles/App";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export default observer(function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  const { token, setAppLoaded, appLoaded } = commonStore;
  const { getUser } = userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [setAppLoaded, getUser, token]);

  if (!appLoaded) return <Loading content="Loading app..." />;

  return (
    <Container>
      <Route path="/" component={Home} exact />

      <Route
        path="/(.+)"
        render={() => (
          <>
            <Navbar />

            <Background>
              <Content>
                <Switch>
                  <Route path="/" component={Home} exact />
                  <Route
                    path="/activities"
                    component={ActivityDashboard}
                    exact
                  />
                  <Route path="/activities/:id" component={ActivityDetails} />
                  <Route
                    key={location.key}
                    path={["/createActivity", "/manage/:id"]}
                    component={ActivityForm}
                  />
                  <Route path="/profiles/:userName" component={Profile} />
                  <Route path="/errors" component={TestErrors} />
                  <Route path="/server-error" component={ServerError} />
                  <Route path="/login" component={LoginForm} />
                  <Route path="/register" component={RegisterForm} />
                  <Route component={NotFound} />
                </Switch>
              </Content>
            </Background>
          </>
        )}
      />

      <ToastContainer position="bottom-center" hideProgressBar />
    </Container>
  );
});
