import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";

import agent from "../../api/agent";

import { Activity } from "../../models/activity";

export default class ActivityStore {
  activitiesRegister = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  formEdit = false;
  submitting = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activitiesRegister.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();

      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          this.activitiesRegister.set(activity.id, activity);
        });

        this.loadingInitial = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activitiesRegister.get(id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.formEdit = true;
  };

  closeForm = () => {
    this.formEdit = false;
  };

  createActivity = async (activity: Activity) => {
    this.submitting = true;
    activity.id = uuid();

    try {
      await agent.Activities.create(activity);

      runInAction(() => {
        this.activitiesRegister.set(activity.id, activity);
        this.selectedActivity = activity;
        this.formEdit = false;
        this.submitting = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.submitting = true;

    try {
      await agent.Activities.update(activity);

      runInAction(() => {
        this.activitiesRegister.set(activity.id, activity);
        this.selectedActivity = activity;
        this.submitting = false;
        this.formEdit = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.submitting = true;

    try {
      await agent.Activities.delete(id);

      runInAction(() => {
        this.activitiesRegister.delete(id);
        if (this.selectedActivity?.id === id) this.selectedActivity = undefined;
        this.submitting = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };
}
