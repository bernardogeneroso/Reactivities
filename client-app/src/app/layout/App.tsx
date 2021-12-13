import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ActivityDashboard from "../../features/activities";
import ActivityForm from "../../features/activities/ActivityForm";
import ActivityDetails from "../../features/activities/ActivityDetails";
import Home from "../../features/Home";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

import Navbar from "./NavBar";

import { Container, Background, Content } from "../styles/App";

function App() {
  const location = useLocation();

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
                  <Route path="/errors" component={TestErrors} />
                  <Route path="/server-error" component={ServerError} />
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
}

export default App;
