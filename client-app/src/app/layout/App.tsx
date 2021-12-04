import React, { useEffect, useState } from "react";
import axios from "axios";

import { Activity } from "../models/activity";

import Navbar from "./NavBar";

import { Container, Content } from "../styles/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((res) => {
        setActivities(res.data);
      });
  }, []);

  return (
    <Container>
      <Navbar />

      <Content>
        <ActivityDashboard {...{ activities }} />
      </Content>
    </Container>
  );
}

export default App;
