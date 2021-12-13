import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { FiClock, FiMapPin } from "react-icons/fi";
import { format } from "date-fns";

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
  const { deleteActivity, submitting } = activityStore;

  const [target, setTarge] = useState("");

  function handleDeleteActivity(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarge(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Container>
      <header>
        <div className="left-side">
          <img src="/assets/user.png" alt="User" />
        </div>
        <div className="rest-side">
          <h3>{activity.title}</h3>
          <span>Hosted by Bob</span>
        </div>
      </header>

      <div className="content">
        <div className="local">
          <span className="date">
            <FiClock />
            {format(activity.date!, "dd MMM yyyy h:mm aa")}
          </span>
          <span className="city">
            <FiMapPin />
            {activity.city}
          </span>
        </div>

        <div className="attendees">Attendees go here</div>
      </div>

      <div className="footer">
        <span className="venue">{activity.venue}</span>

        <div className="options">
          <Button
            name={activity.id}
            situation="negative"
            onClick={(event) => handleDeleteActivity(event, activity.id)}
            loading={target === activity.id && submitting}
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
