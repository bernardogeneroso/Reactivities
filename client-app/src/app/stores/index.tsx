import { createContext } from "react";

import ActivityStore from "./context/activity";
import CommonStore from "./context/common";
import ProfileStore from "./context/profile";
import UserStore from "./context/user";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  profileStore: new ProfileStore(),
};

export const StoreContext = createContext(store);

export const StoreProvider = ({ children }: any) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
