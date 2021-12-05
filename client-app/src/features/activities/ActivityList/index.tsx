import { observer } from "mobx-react-lite";

import useStore from "../../../app/stores/useStore";
import ActivityItem from "./ActivityItem";

import { Container } from "./styles";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { activitiesByDate } = activityStore;

  return (
    <Container>
      {activitiesByDate.map((activity) => (
        <ActivityItem
          key={activity.id}
          {...{
            activity,
          }}
        />
      ))}
    </Container>
  );
});
