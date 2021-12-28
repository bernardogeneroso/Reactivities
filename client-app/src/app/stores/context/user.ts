import { makeAutoObservable, runInAction } from "mobx";
import { store } from "..";
import { history } from "../../..";
import agent from "../../api/agent";

import { User, UserFormValues } from "../../models/user";

export default class UserStore {
  user: User | null = null;
  fbAccessToken: string | null = null;
  fbLoading = false;

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

  setDisplayName = (name: string) => {
    if (this.user) this.user.displayName = name;
  };

  getFacebookLoginStatus = async () => {
    window.FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        this.fbAccessToken = response.authResponse.accessToken;
      }
    });
  };

  facebookLogin = () => {
    this.fbLoading = true;

    const apiLogin = (accessToken: string) => {
      return agent.Account.fbLogin(accessToken)
        .then((user) => {
          store.commonStore.setToken(user.token);
          runInAction(() => {
            this.user = user;
            this.fbLoading = false;
          });
          history.push("/activities");
        })
        .catch((err) => {
          console.log(err);
          runInAction(() => {
            this.fbLoading = false;
          });
        });
    };

    if (this.fbAccessToken) {
      apiLogin(this.fbAccessToken);
    } else {
      window.FB.login(
        (response) => {
          apiLogin(response.authResponse.accessToken);
        },
        { scope: "public_profile,email" }
      );
    }
  };
}
