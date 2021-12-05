import React from "react";
import Button from "../../../../app/components/Button";

import { Activity } from "../../../../app/models/activity";

import { Container } from "./styles";

interface ActivityItemProps {
  activity: Activity;
  handleSelectActivity: (id?: string) => void;
  handleRemoveActivity: (id: string) => void;
}

export default function ActivityItem({
  activity,
  handleSelectActivity,
  handleRemoveActivity,
}: ActivityItemProps) {
  return (
    <Container>
      <header>
        <h3>{activity.title}</h3>
        <span className="date">{activity.date}</span>
      </header>

      <div className="content">
        <span className="releaseDate">Activity 2 months ago</span>
        <span className="local">{activity.city}</span>
      </div>

      <div className="footer">
        <span className="venue">{activity.venue}</span>

        <div className="options">
          <Button
            situation="negative"
            onClick={() => handleRemoveActivity(activity.id)}
          >
            Delete
          </Button>
          <Button
            situation="default"
            onClick={() => handleSelectActivity(activity.id)}
          >
            View
          </Button>
        </div>
      </div>
    </Container>
  );
}
