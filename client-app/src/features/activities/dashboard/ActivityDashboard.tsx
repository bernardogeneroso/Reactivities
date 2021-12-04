import React from "react";
import { List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

import { Container } from "./styles";

interface ActivityDashboardProps {
  activities: Activity[];
}

export default function ActivityDashboard({
  activities,
}: ActivityDashboardProps) {
  return (
    <Container>
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </Container>
  );
}
