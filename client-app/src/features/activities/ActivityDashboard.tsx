import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import useStore from "../../app/stores/useStore";

import Loading from "../../app/components/Loading";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

import { Container } from "./styles";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, loadingInitial, activitiesRegister } = activityStore;

  useEffect(() => {
    if (activitiesRegister.size <= 1) loadActivities();
  }, [loadActivities, activitiesRegister.size]);

  if (loadingInitial) return <Loading content="Loading app" />;

  return (
    <Container>
      <ActivityList />
      <ActivityFilters />
    </Container>
  );
});
