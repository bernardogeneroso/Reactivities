import React from "react";

import { Activity } from "../../app/models/activity";

import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";

import { Container, PanelSticky } from "./styles";

interface ActivityDashboardProps {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  formEdit: boolean;
  handleToggleFormEdit: () => void;
  handleSelectActivity: (id?: string) => void;
  handleCreateOrEditActivity: (activity: Activity) => void;
  handleRemoveActivity: (id: string) => void;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  formEdit,
  handleSelectActivity,
  handleToggleFormEdit,
  handleCreateOrEditActivity,
  handleRemoveActivity,
}: ActivityDashboardProps) {
  return (
    <Container>
      <ActivityList
        {...{ activities, handleSelectActivity, handleRemoveActivity }}
      />

      <PanelSticky>
        {selectedActivity && !formEdit && (
          <ActivityDetails
            {...{
              activity: selectedActivity,
              handleSelectActivity,
              handleToggleFormEdit,
            }}
          />
        )}
        {formEdit && (
          <ActivityForm
            {...{
              selectedActivity,
              handleToggleFormEdit,
              handleCreateOrEditActivity,
            }}
          />
        )}
      </PanelSticky>
    </Container>
  );
}
