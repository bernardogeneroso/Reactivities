import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";

import ValidationErrors from "../../errors/ValidationErrors";
import Button from "../../../app/components/Button";
import Input from "../../../app/components/Input";
import useStore from "../../../app/stores/useStore";

import { Container } from "./styles";

const formValidation = Yup.object({
  displayName: Yup.string().required("Display name is required"),
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  const { register } = userStore;

  return (
    <Container>
      <Formik
        initialValues={{
          displayName: "",
          userName: "",
          email: "",
          password: "",
          error: null,
        }}
        onSubmit={(values, { setErrors }) =>
          register(values).catch((error) => setErrors({ error }))
        }
        validationSchema={formValidation}
      >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
          <Form className="error" onSubmit={handleSubmit} autoComplete="off">
            <h1>Sign Up to Reactivities</h1>
            <Input name="displayName" placeholder="Display name" />
            <Input name="userName" placeholder="Username" />
            <Input name="email" type="email" placeholder="E-mail" />
            <Input name="password" type="password" placeholder="Password" />
            <ErrorMessage
              name="error"
              render={() => <ValidationErrors errors={errors.error} />}
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              situation="positive"
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
});
