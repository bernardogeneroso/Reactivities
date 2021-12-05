import React from "react";
import { useForm } from "react-hook-form";

import { Activity } from "../../../app/models/activity";

import Button from "../../../app/components/Button";

import { Container } from "./styles";

interface ActivityFormProps {
  selectedActivity: Activity | undefined;
  submitting: boolean;
  handleToggleFormEdit: () => void;
  handleCreateOrEditActivity: (activity: Activity) => void;
}

export default function ActivityForm({
  selectedActivity,
  submitting,
  handleToggleFormEdit,
  handleCreateOrEditActivity,
}: ActivityFormProps) {
  const { register, handleSubmit: onSubmit } = useForm<Omit<Activity, "id">>();

  function handleSubmit(data: Omit<Activity, "id">) {
    if (selectedActivity) {
      handleCreateOrEditActivity({
        id: selectedActivity.id,
        ...data,
      });
    } else {
      handleCreateOrEditActivity({
        id: "",
        ...data,
      });
    }
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
        <Button type="submit" situation="positive" loading={submitting}>
          Submit
        </Button>
        <Button
          type="button"
          situation="none"
          onClick={() => handleToggleFormEdit()}
        >
          Cancel
        </Button>
      </div>
    </Container>
  );
}
