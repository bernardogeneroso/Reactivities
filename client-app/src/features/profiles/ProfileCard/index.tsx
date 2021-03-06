import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

import { Profile } from "../../../app/models/profile";
import FollowButton from "../ProfileHeader/FollowButton";

interface ProfileCardProps {
  profile: Profile;
}

export default observer(function ProfileCard({ profile }: ProfileCardProps) {
  function truncate(str: string | undefined) {
    if (str) return str.length > 40 ? str.slice(0, 37) + "..." : str;
  }

  return (
    <Card as={Link} to={`/profiles/${profile.userName}`}>
      <Image src={profile.image || "/assets/user.png"} alt={profile.userName} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{truncate(profile.bio)}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {profile.followersCount} followers
      </Card.Content>
      <FollowButton {...{ profile }} />
    </Card>
  );
});
