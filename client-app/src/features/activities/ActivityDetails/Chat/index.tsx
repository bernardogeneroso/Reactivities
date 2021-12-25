import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Loader } from "semantic-ui-react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";

import useStore from "../../../../app/stores/useStore";

import { Container } from "./styles";

interface ChatProps {
  activityId: string;
}

const schema = Yup.object({
  body: Yup.string().required(),
});

export default observer(function Chat({ activityId }: ChatProps) {
  const { commentStore } = useStore();
  const { createHubConnection, clearComments, comments, addComment } =
    commentStore;

  useEffect(() => {
    if (activityId) {
      createHubConnection(activityId);
    }

    return () => {
      clearComments();
    };
  }, [activityId, createHubConnection, clearComments]);

  return (
    <Container>
      <header>Chat about this event</header>

      <div className="sub-container">
        <Formik
          onSubmit={(values, { resetForm }) =>
            addComment(values).then(() => resetForm())
          }
          initialValues={{ body: "" }}
          validationSchema={schema}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className="ui form">
              <Field name="body">
                {(props: FieldProps) => (
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <Loader active={isSubmitting} />
                    <textarea
                      placeholder="Enter your comment (Enter submit, SHIFT + enter for new line)"
                      rows={2}
                      {...props.field}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.shiftKey) {
                          e.preventDefault();
                          props.form.setFieldValue(
                            "body",
                            props.field.value + "\n"
                          );
                        }

                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          isValid && handleSubmit();
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>

        <div className="chat-container">
          {comments.map((comment) => (
            <div className="message-container" key={comment.id}>
              <img
                src={comment.image || "/assets/user.png"}
                alt={comment.userName}
              />
              <div className="rest-side">
                <div className="header-message">
                  <Link to={`/profiles/${comment.userName}`}>
                    <h3>{comment.displayName}</h3>
                  </Link>
                  <span>{formatDistanceToNow(comment.createdAt)} ago</span>
                </div>
                <div className="message">{comment.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
});
