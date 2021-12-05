import { observer } from "mobx-react-lite";

import useStore from "../../app/stores/useStore";

import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";

import { Container, PanelSticky } from "./styles";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();

  return (
    <Container>
      <ActivityList />

      <PanelSticky>
        {activityStore.selectedActivity && !activityStore.formEdit && (
          <ActivityDetails activity={activityStore.selectedActivity} />
        )}
        {activityStore.formEdit && <ActivityForm />}
      </PanelSticky>
    </Container>
  );
});
