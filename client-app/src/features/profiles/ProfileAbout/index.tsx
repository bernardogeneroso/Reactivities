import { useCallback, useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import ProfileEditForm from "../ProfileEditForm";
import useStore from "../../../app/stores/useStore";

export default observer(function ProfileAbout() {
  const { profileStore } = useStore();
  const { isCurrentUser, profile } = profileStore;
  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = useCallback(() => {
    setEditMode((value) => !value);
  }, []);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width="16">
          <Header
            floated="left"
            icon="user"
            content={`About ${profile?.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width="16">
          {editMode ? (
            <ProfileEditForm {...{ handleToggleEditMode }} />
          ) : (
            <span style={{ whiteSpace: "pre-wrap" }}>{profile?.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
