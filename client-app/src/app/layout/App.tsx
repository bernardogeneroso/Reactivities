import React, { useEffect, useState, useCallback } from "react";
import { v4 as uuid } from "uuid";

import Loading from "../components/Loading";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import { Activity } from "../models/activity";
import agent from "../api/agent";

import Navbar from "./NavBar";

import { Container, Content } from "../styles/App";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [formEdit, setFormEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((data) => {
      const receivedActivities: Activity[] = data.map((activity) => ({
        ...activity,
        date: activity.date.split("T")[0],
      }));

      setActivities(receivedActivities);
      setLoading(false);
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
      setSubmitting(true);

      if (activity.id) {
        agent.Activities.update(activity).then(() => {
          const index = activities.findIndex((a) => a.id === activity.id);
          activities[index] = activity;

          setActivities([...activities]);
          setSelectedActivity(activity);
          setSubmitting(false);
          setFormEdit(false);
        });
      } else {
        activity.id = uuid();

        agent.Activities.create(activity).then(() => {
          activities.push(activity);

          setActivities([...activities]);
          setSelectedActivity(activity);
          setSubmitting(false);
          setFormEdit(false);
        });
      }
    },
    [activities]
  );

  const handleRemoveActivity = useCallback(
    (id: string) => {
      setSubmitting(true);

      agent.Activities.delete(id).then(() => {
        if (selectedActivity?.id === id) setSelectedActivity(undefined);

        setActivities((state) => state.filter((a) => a.id !== id));
        setSubmitting(false);
      });
    },
    [selectedActivity?.id]
  );

  if (loading) return <Loading content="Loading app" />;

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
              submitting,
            }}
          />
        )}
      </Content>
    </Container>
  );
}

export default App;
