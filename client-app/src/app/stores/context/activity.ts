import { makeAutoObservable, runInAction } from "mobx";
import { format } from "date-fns";

import agent from "../../api/agent";

import { Activity, ActivityFormValues } from "../../models/activity";
import { store } from "..";
import { Profile } from "../../models/profile";

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
    const user = store.userStore.user;

    if (user) {
      activity.isGoing = activity.attendees!.some(
        (a) => a.userName === user.userName
      );
      activity.isHost = activity.hostUserName === user.userName;
      activity.host = activity.attendees?.find(
        (a) => a.userName === activity.hostUserName
      );
    }

    activity.date = new Date(activity.date!);
    this.activitiesRegister.set(activity.id, activity);
  }

  private getActivity = (id: string) => {
    return this.activitiesRegister.get(id);
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

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

  createActivity = async (activity: ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
      await agent.Activities.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUserName = user!.userName;
      newActivity.attendees = [attendee];
      this.setActivity(newActivity);

      runInAction(() => {
        this.selectedActivity = newActivity;
      });
    } catch (err) {
      console.log(err);
    }
  };

  updateActivity = async (activity: ActivityFormValues) => {
    try {
      await agent.Activities.update(activity);

      runInAction(() => {
        if (activity.id) {
          let updatedActivity = {
            ...this.getActivity(activity.id),
            ...activity,
          };
          this.activitiesRegister.set(activity.id, updatedActivity as Activity);
          this.selectedActivity = updatedActivity as Activity;
        }
      });
    } catch (err) {
      console.log(err);
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

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;

    try {
      await agent.Activities.attend(this.selectedActivity!.id);

      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees =
            this.selectedActivity.attendees?.filter(
              (a) => a.userName !== user!.userName
            );
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }

        this.activitiesRegister.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (err) {
      console.log(err);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  cancelActivityToggle = async () => {
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);

      runInAction(() => {
        this.selectedActivity!.isCancelled =
          !this.selectedActivity?.isCancelled;
        this.activitiesRegister.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (err) {
      console.log(err);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  updateAttendeeFollowing = (userName: string) => {
    this.activitiesRegister.forEach((activity) => {
      activity.attendees.forEach((attendee) => {
        if (attendee.userName === userName) {
          attendee.following
            ? attendee.followersCount--
            : attendee.followersCount++;
          attendee.following = !attendee.following;
        }
      });
    });
  };
}
