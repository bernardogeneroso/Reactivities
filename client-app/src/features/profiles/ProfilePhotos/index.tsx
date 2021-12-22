import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";

import useStore from "../../../app/stores/useStore";
import { Photo, Profile } from "../../../app/models/profile";
import PhotoUploadWidget from "../../../app/components/PhotoUploadWidget";

interface ProfilePhotosProps {
  profile: Profile;
}

export default observer(function ProfilePhotos({
  profile,
}: ProfilePhotosProps) {
  const { profileStore } = useStore();
  const {
    isCurrentUser,
    uploadPhoto,
    uploading,
    loading,
    setMainPhoto,
    deletePhoto,
  } = profileStore;

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  function handleToggleAddPhotoMode() {
    setAddPhotoMode((value) => !value);
  }

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => handleToggleAddPhotoMode());
  }

  function handleSetMainPhoto(
    photo: Photo,
    event: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(event.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(
    photo: Photo,
    event: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(event.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={handleToggleAddPhotoMode}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget {...{ uploading, handlePhotoUpload }} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url || "/assets/user.png"} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={`main-${photo.id}`}
                        loading={target === `main-${photo.id}` && loading}
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                        disabled={photo.isMain}
                      />
                      <Button
                        basic
                        color="red"
                        icon="trash"
                        name={`delete-${photo.id}`}
                        loading={target === `delete-${photo.id}` && loading}
                        onClick={(e) => handleDeletePhoto(photo, e)}
                        disabled={photo.isMain}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
