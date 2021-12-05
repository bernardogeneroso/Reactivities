import React from "react";

import { Activity } from "../../../app/models/activity";

import ActivityItem from "./ActivityItem";

import { Container } from "./styles";

interface ActivityListProps {
  activities: Activity[];
  handleSelectActivity: (id?: string) => void;
  handleRemoveActivity: (id: string) => void;
}

export default function ActivityList({
  activities,
  handleSelectActivity,
  handleRemoveActivity,
}: ActivityListProps) {
  return (
    <Container>
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          {...{ activity, handleSelectActivity, handleRemoveActivity }}
        />
      ))}
    </Container>
  );
}
