import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import useStore from "../../app/stores/useStore";
import Loading from "../../app/components/Loading";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

import { Container } from "./styles";
import { useEffect } from "react";

interface ProfileParams {
  userName: string;
}

export default observer(function Profile() {
  const { userName } = useParams<ProfileParams>();
  const { profileStore } = useStore();
  const { loadingProfile, loadProfile, profile } = profileStore;

  useEffect(() => {
    loadProfile(userName);
  }, [loadProfile, userName]);

  if (loadingProfile) return <Loading content="Loading profile..." />;

  return (
    <Container>
      {profile && (
        <>
          <ProfileHeader {...{ profile }} />
          <ProfileContent {...{ profile }} />
        </>
      )}
    </Container>
  );
});
