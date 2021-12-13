import { FiInfo, FiCalendar, FiMapPin } from "react-icons/fi";
import { format } from "date-fns";

import { Activity } from "../../../../app/models/activity";

import { Container } from "./styles";

interface InformationProps {
  activity: Activity;
}

export default function Information({ activity }: InformationProps) {
  return (
    <Container>
      <div className="content">
        <FiInfo />
        {activity.description}
      </div>
      <div className="content">
        <FiCalendar />
        {format(activity.date!, "dd MMM yyyy")}
      </div>
      <div className="content">
        <FiMapPin />
        {activity.venue}, {activity.city}
      </div>
    </Container>
  );
}
