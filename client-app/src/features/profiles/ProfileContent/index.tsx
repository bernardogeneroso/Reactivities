import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";

import { Profile } from "../../../app/models/profile";
import useStore from "../../../app/stores/useStore";
import ProfileAbout from "../ProfileAbout";
import ProfileFollowings from "../ProfileFollowings";
import ProfilePhotos from "../ProfilePhotos";

import { Container } from "./styles";

interface ProfileContentProps {
  profile: Profile;
}

export default observer(function ProfileContent({
  profile,
}: ProfileContentProps) {
  const { profileStore } = useStore();
  const { setActiveTab } = profileStore;

  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: "Photos", render: () => <ProfilePhotos {...{ profile }} /> },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
      menuItem: "Following",
      render: () => <ProfileFollowings {...{ profile }} />,
    },
    {
      menuItem: "Followers",
      render: () => <ProfileFollowings {...{ profile }} />,
    },
  ];

  return (
    <Container>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="right"
        panes={panes}
        onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      />
    </Container>
  );
});
