import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";

import { Profile } from "../../../../../app/models/profile";

import ProfileCard from "../../../../profiles/ProfileCard";

interface AttendeesListProps {
  attendees: Profile[];
}

export default function AttendeesList({ attendees }: AttendeesListProps) {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.userName}
          trigger={
            <List.Item as={Link} to={`/profiles/${attendee.userName}`}>
              <Image
                size="mini"
                circular
                src={attendee.image || "/assets/user.png"}
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
}
