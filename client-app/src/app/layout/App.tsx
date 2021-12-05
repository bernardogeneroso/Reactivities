import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Loading from "../components/Loading";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import useStore from "../stores/useStore";

import Navbar from "./NavBar";

import { Container, Content } from "../styles/App";

function App() {
  const { activityStore } = useStore();
  const { activitiesByDate } = activityStore;

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <Loading content="Loading app" />;

  return (
    <Container>
      <Navbar />

      <Content>{activitiesByDate.length > 0 && <ActivityDashboard />}</Content>
    </Container>
  );
}

export default observer(App);
