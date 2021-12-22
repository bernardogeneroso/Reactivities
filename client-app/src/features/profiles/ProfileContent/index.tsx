import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";

import ProfilePhotos from "../ProfilePhotos";

import { Container } from "./styles";

interface ProfileContentProps {
  profile: Profile;
}

export default observer(function ProfileContent({
  profile,
}: ProfileContentProps) {
  const panes = [
    { menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane> },
    { menuItem: "Photos", render: () => <ProfilePhotos {...{ profile }} /> },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
  ];

  return (
    <Container>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="right"
        panes={panes}
      />
    </Container>
  );
});
