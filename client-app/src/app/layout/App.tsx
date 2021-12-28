import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import useStore from "../stores/useStore";

import PrivateRoute from "./PrivateRoute";
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
  const { getUser, getFacebookLoginStatus } = userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      getFacebookLoginStatus().then(() => setAppLoaded());
    }
  }, [setAppLoaded, getUser, token, getFacebookLoginStatus]);

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
                  <PrivateRoute
                    path="/activities"
                    component={ActivityDashboard}
                    exact
                  />
                  <PrivateRoute
                    path="/activities/:id"
                    component={ActivityDetails}
                  />
                  <PrivateRoute
                    key={location.key}
                    path={["/createActivity", "/manage/:id"]}
                    component={ActivityForm}
                  />
                  <PrivateRoute
                    path="/profiles/:userName"
                    component={Profile}
                  />
                  <PrivateRoute path="/errors" component={TestErrors} />
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
