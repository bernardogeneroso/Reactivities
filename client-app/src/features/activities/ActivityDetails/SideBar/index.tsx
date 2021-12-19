import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { Activity } from "../../../../app/models/activity";

import { Container } from "./styles";

interface SideBarProps {
  activity: Activity;
}

export default observer(function SideBar({
  activity: { attendees, host },
}: SideBarProps) {
  if (!attendees) return null;

  return (
    <Container>
      <header>
        {attendees.length} {attendees.length === 1 ? "Person" : "People"}
      </header>

      <div className="container-people">
        {attendees.map((attendee) => (
          <div className="content" key={attendee.userName}>
            <div className="left-side">
              <img
                src={attendee.image || "/assets/user.png"}
                alt={attendee.userName}
              />
            </div>
            <div className="rest-side">
              <Link to={`/profile/${attendee.userName}`}>
                <h3>{attendee.displayName}</h3>
              </Link>
              <span>Following</span>
            </div>
            {attendee.userName === host?.userName && (
              <div className="hosted">
                <span>Host</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
});
