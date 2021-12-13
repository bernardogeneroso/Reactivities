import { makeAutoObservable, runInAction } from "mobx";
import { format } from "date-fns";

import agent from "../../api/agent";

import { Activity } from "../../models/activity";

export default class ActivityStore {
  activitiesRegister = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  submitting = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activitiesRegister.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date!, "dd MMM yyyy");
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];

        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();

      runInAction(() => {
        activities.forEach((activity) => {
          this.setActivity(activity);
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

  private setActivity(activity: Activity) {
    activity.date = new Date(activity.date!);
    this.activitiesRegister.set(activity.id, activity);
  }

  loadActivity = async (id: string) => {
    let activity = this.activitiesRegister.get(id);

    if (activity) {
      this.selectedActivity = activity;

      return activity;
    } else {
      this.loadingInitial = true;

      try {
        activity = await agent.Activities.details(id);

        runInAction(() => {
          this.setActivity(activity!);
          this.selectedActivity = activity;
          this.loadingInitial = false;
        });

        return activity;
      } catch (err) {
        console.log(err);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  createActivity = async (activity: Activity) => {
    this.submitting = true;

    try {
      await agent.Activities.create(activity);

      runInAction(() => {
        this.activitiesRegister.set(activity.id, activity);
        this.selectedActivity = activity;
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
