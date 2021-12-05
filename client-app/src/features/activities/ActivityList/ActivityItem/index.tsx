import React, { memo, SyntheticEvent, useState } from "react";
import Button from "../../../../app/components/Button";

import { Activity } from "../../../../app/models/activity";

import { Container } from "./styles";

interface ActivityItemProps {
  activity: Activity;
  submitting: boolean;
  handleSelectActivity: (id?: string) => void;
  handleRemoveActivity: (id: string) => void;
}

function ActivityItem({
  activity,
  submitting,
  handleSelectActivity,
  handleRemoveActivity,
}: ActivityItemProps) {
  const [target, setTarge] = useState("");

  function handleDeleteActivity(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarge(e.currentTarget.name);
    handleRemoveActivity(id);
  }

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
            name={activity.id}
            situation="negative"
            onClick={(event) => handleDeleteActivity(event, activity.id)}
            loading={target === activity.id && submitting}
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

export default memo(ActivityItem);
