import React from "react";

import { Activity } from "../../../app/models/activity";

import ActivityItem from "./ActivityItem";

import { Container } from "./styles";

interface ActivityListProps {
  activities: Activity[];
  submitting: boolean;
  handleSelectActivity: (id?: string) => void;
  handleRemoveActivity: (id: string) => void;
}

export default function ActivityList({
  activities,
  submitting,
  handleSelectActivity,
  handleRemoveActivity,
}: ActivityListProps) {
  return (
    <Container>
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          {...{
            activity,
            submitting,
            handleSelectActivity,
            handleRemoveActivity,
          }}
        />
      ))}
    </Container>
  );
}
