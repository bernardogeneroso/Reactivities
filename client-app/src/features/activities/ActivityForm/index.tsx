import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

import { Activity } from "../../../app/models/activity";

import Button from "../../../app/components/Button";
import useStore from "../../../app/stores/useStore";

import { Container } from "./styles";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { selectedActivity, createActivity, updateActivity } = activityStore;

  const { register, handleSubmit: onSubmit } = useForm<Omit<Activity, "id">>();

  function handleSubmit(data: Omit<Activity, "id">) {
    selectedActivity
      ? updateActivity({
          id: selectedActivity.id,
          ...data,
        })
      : createActivity({
          id: "",
          ...data,
        });
  }

  return (
    <Container onSubmit={onSubmit(handleSubmit)}>
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          defaultValue={selectedActivity?.title}
          {...register("title")}
        />
        <textarea
          cols={3}
          rows={3}
          placeholder="Description"
          defaultValue={selectedActivity?.description}
          {...register("description")}
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          defaultValue={selectedActivity?.category}
          {...register("category")}
        />
        <input
          type="date"
          placeholder="Date"
          defaultValue={selectedActivity?.date}
          {...register("date")}
        />
        <input
          type="text"
          placeholder="City"
          defaultValue={selectedActivity?.city}
          {...register("city")}
        />
        <input
          type="text"
          placeholder="Venue"
          defaultValue={selectedActivity?.venue}
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
        <Button
          type="button"
          situation="none"
          onClick={() => activityStore.closeForm()}
        >
          Cancel
        </Button>
      </div>
    </Container>
  );
});
