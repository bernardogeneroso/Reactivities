import React from "react";

import { Activity } from "../../../app/models/activity";

import { Container } from "./styles";

interface ActivityDetailsProps {
  activity: Activity;
  handleSelectActivity: (id?: string) => void;
  handleToggleFormEdit: () => void;
}

export default function ActivityDetails({
  activity,
  handleSelectActivity,
  handleToggleFormEdit,
}: ActivityDetailsProps) {
  return (
    <Container>
      <img
        src={`/assets/categoryImages/${activity.category}.jpg`}
        alt={activity.category}
      />

      <div className="content">
        <h3>{activity.title}</h3>
        <span className="date">{activity.date}</span>

        <span className="releaseDate">{activity.description}</span>
      </div>

      <div className="footer">
        <button onClick={() => handleToggleFormEdit()}>Edit</button>
        <button onClick={() => handleSelectActivity()}>Cancel</button>
      </div>
    </Container>
  );
}
