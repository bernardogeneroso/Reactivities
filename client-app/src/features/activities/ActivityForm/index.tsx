import { observer } from "mobx-react-lite";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";

import { ActivityFormValues } from "../../../app/models/activity";

import Input from "../../../app/components/Input";
import Button from "../../../app/components/Button";
import Loading from "../../../app/components/Loading";
import Textarea from "../../../app/components/Textarea";
import SelectInput from "../../../app/components/SelectInput";
import { category } from "../../../app/components/SelectInput/Options/category";
import DateInput from "../../../app/components/DateInput";
import useStore from "../../../app/stores/useStore";

import { Container } from "./styles";

interface ActivityFormParams {
  id: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.string().required("Date is required").nullable(),
  city: Yup.string().required("City is required"),
  venue: Yup.string().required("Venue is required"),
});

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    activityStore;
  const history = useHistory();
  const { id } = useParams<ActivityFormParams>();
  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        setActivity(new ActivityFormValues(activity));
      });
    }
  }, [id, loadActivity]);

  function handleFormSubmit(data: ActivityFormValues) {
    if (!data.id) {
      let newActivity = {
        ...data,
        id: uuid(),
      };

      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity({
        ...data,
        id: activity.id,
      }).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  }

  if (loadingInitial) return <Loading content="Loading activity on form..." />;

  return (
    <Container>
      <h2>Activity details</h2>

      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <div className="content">
              <Input name="title" placeholder="Title" />
              <Textarea
                name="description"
                placeholder="Description"
                cols={3}
                rows={4}
              />
              <SelectInput
                options={category}
                name="category"
                placeholder="Category"
              />
              <DateInput
                name="date"
                placeholderText="Date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />

              <h2>Location details</h2>
              <Input name="city" placeholder="City" />
              <Input name="venue" placeholder="Venue" />
            </div>

            <div className="footer">
              <Button
                type="submit"
                situation="positive"
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
              >
                Submit
              </Button>
              <Link to="/activities">
                <Button type="button" situation="none">
                  Cancel
                </Button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
});
