import { makeAutoObservable, reaction, runInAction } from "mobx";
import { format } from "date-fns";

import agent from "../../api/agent";

import { Activity, ActivityFormValues } from "../../models/activity";
import { store } from "..";
import { Profile } from "../../models/profile";
import { Pagination, PagingParams } from "../../models/pagination";

export default class ActivityStore {
  activitiesRegister = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  submitting = false;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("all", true);

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.activitiesRegister.clear();
        this.loadActivities();
      }
    );
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => {
        if (key !== "startDate") this.predicate.delete(key);
      });
    };

    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isGoing":
        resetPredicate();
        this.predicate.set("isGoing", true);
        break;
      case "isHost":
        resetPredicate();
        this.predicate.set("isHost", true);
        break;
      case "startDate":
        this.predicate.delete("startDate");
        this.predicate.set("startDate", value);
        break;
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();

    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, (value as Date).toISOString());
      } else {
        params.append(key, value);
      }
    });

    return params;
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
      const result = await agent.Activities.list(this.axiosParams);

      runInAction(() => {
        result.data.forEach((activity) => {
          this.setActivity(activity);
        });
        this.setPagination(result.pagination);
        this.loadingInitial = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
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
