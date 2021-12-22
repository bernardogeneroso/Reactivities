import { makeAutoObservable, runInAction } from "mobx";
import { store } from "..";
import { history } from "../../..";
import agent from "../../api/agent";

import { User, UserFormValues } from "../../models/user";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (credentials: UserFormValues) => {
    try {
      const user = await agent.Account.login(credentials);
      store.commonStore.setToken(user.token);

      runInAction(() => (this.user = user));
      history.push("/activities");
    } catch (err) {
      throw err;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    localStorage.removeItem("Reactivities:Token");
    this.user = null;
    history.push("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();

      runInAction(() => (this.user = user));
    } catch (err) {
      console.log(err);
    }
  };

  register = async (credentials: UserFormValues) => {
    try {
      const user = await agent.Account.register(credentials);
      store.commonStore.setToken(user.token);

      runInAction(() => (this.user = user));
      history.push("/activities");
    } catch (err) {
      throw err;
    }
  };

  setImage = (image: string) => {
    if (this.user) this.user.image = image;
  };
}
