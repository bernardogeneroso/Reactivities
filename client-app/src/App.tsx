import React, { useEffect, useState } from "react";
import "./App.css";

import { Header, List } from "semantic-ui-react";

import axios from "axios";

function App() {
  const [activities, setActivities] = useState<any>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((res) => {
      setActivities(res.data);
    });
  }, []);
  return (
    <div>
      <Header as="h2" icons="users" content="Reactivities" />

      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
