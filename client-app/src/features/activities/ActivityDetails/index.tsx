import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Chat from "./Chat";
import Header from "./Header";
import Information from "./Information";
import SideBar from "./SideBar";

import useStore from "../../../app/stores/useStore";
import Loading from "../../../app/components/Loading";

import { Container } from "./styles";

interface ActivityDetailsParams {
  id: string;
}

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<ActivityDetailsParams>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <Loading />;

  return (
    <Container>
      <Header {...{ activity }} />
      <Information {...{ activity }} />
      <Chat />
      <SideBar />
    </Container>
  );
});
