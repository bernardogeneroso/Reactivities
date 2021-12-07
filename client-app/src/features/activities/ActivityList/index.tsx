import { observer } from "mobx-react-lite";

import useStore from "../../../app/stores/useStore";
import ActivityItem from "./ActivityItem";

import { Container, Content } from "./styles";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <Container>
      {groupedActivities.map(([group, activities]) => (
        <Content key={group}>
          <h3 className="group">{group}</h3>

          {activities.map((activity) => (
            <ActivityItem
              {...{
                key: activity.id,
                activity,
              }}
            />
          ))}
        </Content>
      ))}
    </Container>
  );
});
