import { useContext } from "react";

import { StoreContext } from ".";

export default function useStore() {
  return useContext(StoreContext);
}
