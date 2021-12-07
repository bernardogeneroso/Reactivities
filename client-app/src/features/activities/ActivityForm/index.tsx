import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { Activity } from "../../../app/models/activity";

import Button from "../../../app/components/Button";
import Loading from "../../../app/components/Loading";
import useStore from "../../../app/stores/useStore";

import { Container } from "./styles";

interface ActivityFormParams {
  id: string;
}

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    activityStore;
  const history = useHistory();
  const { id } = useParams<ActivityFormParams>();
  const [activity, setActivity] = useState<Activity>({} as Activity);

  const {
    register,
    handleSubmit: onSubmit,
    setValue,
  } = useForm<Omit<Activity, "id">>();

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        setActivity(activity!);
        setValue("title", activity!.title);
        setValue("description", activity!.description);
        setValue("category", activity!.category);
        setValue("date", activity!.date);
        setValue("city", activity!.city);
        setValue("venue", activity!.venue);
      });
    }
  }, [id, loadActivity, setValue]);

  function handleSubmit(data: Omit<Activity, "id">) {
    if (!activity.id) {
      let newActivity = {
        id: uuid(),
        ...data,
      };

      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity({
        id: activity.id,
        ...data,
      }).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  }

  if (loadingInitial) return <Loading content="Loading app" />;

  return (
    <Container onSubmit={onSubmit(handleSubmit)}>
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          defaultValue={activity.title}
          {...register("title")}
        />
        <textarea
          cols={3}
          rows={3}
          placeholder="Description"
          defaultValue={activity.description}
          {...register("description")}
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          defaultValue={activity.category}
          {...register("category")}
        />
        <input
          type="date"
          placeholder="Date"
          defaultValue={activity.date}
          {...register("date")}
        />
        <input
          type="text"
          placeholder="City"
          defaultValue={activity.city}
          {...register("city")}
        />
        <input
          type="text"
          placeholder="Venue"
          defaultValue={activity.venue}
          {...register("venue")}
        />
      </div>

      <div className="footer">
        <Button
          type="submit"
          situation="positive"
          loading={activityStore.submitting}
        >
          Submit
        </Button>
        <Link to="/activities">
          <Button type="button" situation="none">
            Cancel
          </Button>
        </Link>
      </div>
    </Container>
  );
});
