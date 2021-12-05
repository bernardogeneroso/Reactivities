import { createContext } from "react";

import ActivityStore from "./context/activity";

interface Store {
  activityStore: ActivityStore;
}

const store: Store = {
  activityStore: new ActivityStore(),
};

export const StoreContext = createContext(store);

export const StoreProvider = ({ children }: any) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
