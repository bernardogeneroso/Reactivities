import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import Button from "../../../../app/components/Button";
import { Activity } from "../../../../app/models/activity";

import { Container } from "./styles";
import useStore from "../../../../app/stores/useStore";
import { Label } from "semantic-ui-react";

interface HeaderProps {
  activity: Activity;
}

export default observer(function Header({ activity }: HeaderProps) {
  const { activityStore } = useStore();
  const { updateAttendance, loading, cancelActivityToggle } = activityStore;

  return (
    <Container>
      <div className="content">
        {activity.isCancelled && (
          <Label
            style={{
              position: "absolute",
              zIndex: 1000,
              left: -14,
              top: 20,
            }}
            ribbon
            color="red"
            content="Cancelled"
          />
        )}
        <img
          src={`/assets/categoryImages/${activity.category}.jpg`}
          alt={activity.category}
        />
        <div className="hover-image">
          <h1>{activity.title}</h1>
          <span>{format(activity.date!, "dd MMM yyyy")}</span>
          <span className="hostedBy">
            Hosted by{" "}
            <span>
              <Link to={`/profiles/${activity.host?.userName}`}>
                {activity.host?.displayName}
              </Link>
            </span>
          </span>
        </div>
      </div>
      <div className="footer">
        <div className="actions">
          {activity.isHost ? (
            <>
              <Button
                situation={activity.isCancelled ? "positive" : "negative"}
                onClick={cancelActivityToggle}
                loading={loading}
              >
                {activity.isCancelled
                  ? "Re-activate Activity"
                  : "Cancel Activity"}
              </Button>
              <div className="rest-side">
                <Link to={`/manage/${activity.id}`}>
                  <Button situation="master" disabled={activity.isCancelled}>
                    Manage event
                  </Button>
                </Link>
              </div>
            </>
          ) : activity.isGoing ? (
            <Button
              situation="none"
              loading={loading}
              onClick={updateAttendance}
            >
              Cancel attendance
            </Button>
          ) : (
            <Button
              situation="default"
              loading={loading}
              onClick={updateAttendance}
              disabled={activity.isCancelled}
            >
              Join activity
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
});
