import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

import { Activity } from "../models/activity";

import Navbar from "./NavBar";

import { Container, Content } from "../styles/App";
import ActivityDashboard from "../../features/activities/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [formEdit, setFormEdit] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((res) => {
        setActivities(res.data);
      });
  }, []);

  const handleOpenFormEdit = useCallback(() => {
    setSelectedActivity(undefined);
    setFormEdit(true);
  }, []);

  const handleToggleFormEdit = useCallback(() => {
    setFormEdit((state) => !state);
  }, []);

  const handleSelectActivity = useCallback(
    (id?: string) => {
      if (!id) {
        setSelectedActivity(undefined);

        return;
      }

      if (formEdit) return;

      const activityFound = activities.find((a) => a.id === id);

      setSelectedActivity(activityFound);
    },
    [activities, formEdit]
  );

  const handleCreateOrEditActivity = useCallback(
    (activity: Activity) => {
      if (activity.id) {
        const index = activities.findIndex((a) => a.id === activity.id);
        activities[index] = activity;
      } else {
        activity.id = uuid();
        activities.push(activity);
      }
      setActivities([...activities]);
      setSelectedActivity(activity);
    },
    [activities]
  );

  const handleRemoveActivity = useCallback((id: string) => {
    setActivities((state) => state.filter((a) => a.id !== id));
  }, []);

  return (
    <Container>
      <Navbar {...{ handleOpenFormEdit }} />

      <Content>
        {activities.length > 0 && (
          <ActivityDashboard
            {...{
              activities,
              selectedActivity,
              formEdit,
              handleToggleFormEdit,
              handleSelectActivity,
              handleCreateOrEditActivity,
              handleRemoveActivity,
            }}
          />
        )}
      </Content>
    </Container>
  );
}

export default App;
