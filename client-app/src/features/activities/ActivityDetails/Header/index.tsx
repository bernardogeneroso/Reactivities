import { Link } from "react-router-dom";
import { format } from "date-fns";

import Button from "../../../../app/components/Button";
import { Activity } from "../../../../app/models/activity";

import { Container } from "./styles";

interface HeaderProps {
  activity: Activity;
}

export default function Header({ activity }: HeaderProps) {
  return (
    <Container>
      <div className="content">
        <img
          src={`/assets/categoryImages/${activity.category}.jpg`}
          alt="Music"
        />
        <div className="hover-image">
          <h1>{activity.title}</h1>
          <span>{format(activity.date!, "dd MMM yyyy")}</span>
          <span className="hostedBy">
            Hosted by <span>Bob</span>
          </span>
        </div>
      </div>
      <div className="footer">
        <div className="actions">
          <Button situation="default">Join activity</Button>
          <Button situation="none">Cancel attendance</Button>
        </div>
        <div className="rest-side">
          <Link to={`/manage/${activity.id}`}>
            <Button situation="master">Manage event</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
