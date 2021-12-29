import { Button, Header, Icon, Segment } from "semantic-ui-react";

import useStore from "../../../app/stores/useStore";
import useQuery from "../../../app/util/hooks";

export default function RegisterSuccess() {
  const email = useQuery().get("email") as string;

  const { userStore } = useStore();
  const { resendEmailConfirmationLink } = userStore;

  return (
    <Segment placeholder textAlign="center">
      <Header icon color="green">
        <Icon name="check" />
        Successfully registered!
      </Header>
      <p>
        Please check your email (including junk email) for the verification
        email
      </p>
      {email && (
        <>
          <p>Didn't receive the email? Click the bellow button to resend</p>
          <Button
            primary
            onClick={() => resendEmailConfirmationLink(email)}
            content="Resend email"
            size="huge"
          />
        </>
      )}
    </Segment>
  );
}
