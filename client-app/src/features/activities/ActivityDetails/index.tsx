import { Activity } from "../../../app/models/activity";
import useStore from "../../../app/stores/useStore";

import { Container } from "./styles";

interface ActivityDetailsProps {
  activity: Activity;
}

export default function ActivityDetails({ activity }: ActivityDetailsProps) {
  const { activityStore } = useStore();

  return (
    <Container>
      <img
        src={`/assets/categoryImages/${activity.category}.jpg`}
        alt={activity.category}
      />

      <div className="content">
        <h3>{activity.title}</h3>
        <span className="date">{activity.date}</span>

        <span className="releaseDate">{activity.description}</span>
      </div>

      <div className="footer">
        <button onClick={() => activityStore.openForm(activity.id)}>
          Edit
        </button>
        <button onClick={() => activityStore.cancelSelectedActivity()}>
          Cancel
        </button>
      </div>
    </Container>
  );
}
