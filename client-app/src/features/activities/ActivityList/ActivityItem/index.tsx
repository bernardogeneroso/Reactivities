import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import Button from "../../../../app/components/Button";

import { Activity } from "../../../../app/models/activity";
import useStore from "../../../../app/stores/useStore";

import { Container } from "./styles";
import { Link } from "react-router-dom";

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  const { activityStore } = useStore();

  const [target, setTarge] = useState("");

  function handleDeleteActivity(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarge(e.currentTarget.name);
    activityStore.deleteActivity(id);
  }

  return (
    <Container>
      <header>
        <h3>{activity.title}</h3>
        <span className="date">{activity.date}</span>
      </header>

      <div className="content">
        <span className="releaseDate">Activity 2 months ago</span>
        <span className="local">{activity.city}</span>
      </div>

      <div className="footer">
        <span className="venue">{activity.venue}</span>

        <div className="options">
          <Button
            name={activity.id}
            situation="negative"
            onClick={(event) => handleDeleteActivity(event, activity.id)}
            loading={target === activity.id && activityStore.submitting}
          >
            Delete
          </Button>
          <Link to={`/activities/${activity.id}`}>
            <Button situation="default">View</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default observer(ActivityItem);
