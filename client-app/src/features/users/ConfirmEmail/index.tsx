import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

import agent from "../../../app/api/agent";
import useStore from "../../../app/stores/useStore";
import useQuery from "../../../app/util/hooks";

export default function ConfirmEmail() {
  const email = useQuery().get("email") as string;
  const token = useQuery().get("token") as string;

  const Status = {
    Verifying: "Verifying",
    Failed: "Failed",
    Success: "Success",
  };

  const { userStore } = useStore();
  const { resendEmailConfirmationLink } = userStore;

  const [status, setStatus] = useState(Status.Verifying);

  useEffect(() => {
    agent.Account.verifyEmail(token, email)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => {
        setStatus(Status.Failed);
      });
  }, [Status.Failed, Status.Success, token, email]);

  function getBody() {
    switch (status) {
      case Status.Verifying:
        return <p>Verifying...</p>;
      case Status.Failed:
        return (
          <div>
            <p>
              Verification failed. You can try resending the verify link to your
              email
            </p>
            <Button
              primary
              onClick={() => resendEmailConfirmationLink(email)}
              size="huge"
              content="Resend email"
            />
          </div>
        );
      case Status.Success:
        return (
          <div>
            <p>Email has been verified - you can now login</p>
            <Button
              as={Link}
              to="/login"
              primary
              content="Redirect to login page"
              size="huge"
            />
          </div>
        );
    }
  }

  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="envelope" />
        Email verification
      </Header>
      <Segment.Inline>{getBody()}</Segment.Inline>
    </Segment>
  );
}
