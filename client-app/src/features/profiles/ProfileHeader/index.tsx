import { observer } from "mobx-react-lite";
import {
  Divider,
  Grid,
  Header,
  Item,
  Segment,
  Statistic,
} from "semantic-ui-react";

import { Profile } from "../../../app/models/profile";
import FollowButton from "./FollowButton";

import { Container } from "./styles";

interface ProfileHeaderProps {
  profile: Profile;
}

export default observer(function ProfileHeader({
  profile,
}: ProfileHeaderProps) {
  return (
    <Container>
      <Segment>
        <Grid>
          <Grid.Column width={12}>
            <Item.Group>
              <Item>
                <Item.Image
                  avatar
                  size="small"
                  src={profile.image || "/assets/user.png"}
                />
                <Item.Content>
                  <Header as="h1" content={profile.displayName} />
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <Statistic.Group widths={2}>
              <Statistic label="Followers" value={profile.followersCount} />
              <Statistic label="Following" value={profile.followingCount} />
            </Statistic.Group>
            <Divider />
            <FollowButton {...{ profile }} />
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
});
