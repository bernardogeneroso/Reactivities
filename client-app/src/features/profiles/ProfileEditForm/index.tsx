import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";

import Input from "../../../app/components/Input";
import Textarea from "../../../app/components/Textarea";
import useStore from "../../../app/stores/useStore";

interface Props {
  handleToggleEditMode: () => void;
}

const schema = Yup.object({
  displayName: Yup.string().required(),
});

export default observer(function ProfileEditForm({
  handleToggleEditMode,
}: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => {
        updateProfile(values).then(() => {
          handleToggleEditMode();
        });
      }}
      validationSchema={schema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <Input placeholder="Display Name" name="displayName" />
          <Textarea rows={3} placeholder="Add your bio" name="bio" />
          <Button
            positive
            type="submit"
            loading={isSubmitting}
            content="Update profile"
            floated="right"
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
});
