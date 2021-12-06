import { Route, useLocation } from "react-router-dom";

import ActivityDashboard from "../../features/activities/ActivityDashboard";
import ActivityForm from "../../features/activities/ActivityForm";
import ActivityDetails from "../../features/activities/ActivityDetails";
import Home from "../../features/Home";

import Navbar from "./NavBar";

import { Container, Content } from "../styles/App";

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

            <Content>
              <Route path="/" component={Home} exact />
              <Route path="/activities" component={ActivityDashboard} exact />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Content>
          </>
        )}
      />
    </Container>
  );
}

export default App;
