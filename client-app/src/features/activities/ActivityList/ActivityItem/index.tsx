import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { FiClock, FiMapPin } from "react-icons/fi";
import { format } from "date-fns";

import AttendeesList from "./AttendeesList";
import Button from "../../../../app/components/Button";

import { Activity } from "../../../../app/models/activity";
import useStore from "../../../../app/stores/useStore";

import { Container } from "./styles";
import { Link } from "react-router-dom";
import { Item, Label } from "semantic-ui-react";

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  const { activityStore } = useStore();
  const { deleteActivity, submitting } = activityStore;

  const [target, setTarget] = useState("");

  function handleDeleteActivity(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Container>
      {activity.isCancelled && (
        <Label
          attached="top"
          color="red"
          content="Cancelled"
          style={{
            textAlign: "center",
          }}
        />
      )}
      <header>
        <div className="left-side">
          <img src={activity.host?.image || "/assets/user.png"} alt="User" />
        </div>
        <div className="rest-side">
          <h3>{activity.title}</h3>
          <span>
            Hosted by{" "}
            <Link to={`/profiles/${activity.host?.userName}`}>
              {activity.host?.displayName}
            </Link>
          </span>
        </div>
        {activity.isHost && (
          <Item.Description>
            <Label basic color="orange">
              You are hosting this activity
            </Label>
          </Item.Description>
        )}
        {activity.isGoing && !activity.isHost && (
          <Item.Description>
            <Label basic color="green">
              You are going to this activity
            </Label>
          </Item.Description>
        )}
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

        <div className="attendees">
          <AttendeesList attendees={activity.attendees!} />
        </div>
      </div>

      <div className="footer">
        <span className="venue">{activity.venue}</span>

        <div className="options">
          {activity.isHost && (
            <Button
              name={activity.id}
              situation="negative"
              onClick={(event) => handleDeleteActivity(event, activity.id)}
              loading={target === activity.id && submitting}
            >
              Delete
            </Button>
          )}
          <Link to={`/activities/${activity.id}`}>
            <Button situation="default">View</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default observer(ActivityItem);
