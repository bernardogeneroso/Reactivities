import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Label } from "semantic-ui-react";

import Button from "../../../app/components/Button";
import Input from "../../../app/components/Input";
import useStore from "../../../app/stores/useStore";

import { Container } from "./styles";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  const { login } = userStore;

  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
          error: null,
        }}
        onSubmit={(values, { setErrors }) =>
          login(values).catch((err) =>
            setErrors({ error: "Invalid email or password" })
          )
        }
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <h1>Sign In to Reactivities</h1>
            <Input name="email" placeholder="E-mail" />
            <Input name="password" type="password" placeholder="Password" />
            <ErrorMessage
              name="error"
              render={() => (
                <Label
                  style={{ marginBottom: "1rem" }}
                  color="red"
                  content={errors.error}
                />
              )}
            />
            <Button loading={isSubmitting} situation="positive" type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
});
