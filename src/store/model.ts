import { action, Action } from "easy-peasy";

interface UserModel {
  profile: {
    fullName: string;
    lastName: string;
    firstName: string;
    email: string;
    avatar: string;
  };
  token: string;
  isAuth: boolean;
  saveToken: Action<
    this,
    {
      token: string;
      profile: {
        fullName: string;
        lastName: string;
        firstName: string;
        email: string;
        avatar: string;
      };
    }
  >;
  logOut: Action<this>;
  updateProfile: Action<
    this,
    {
      profile: {
        firstName: string;
        lastName: string;
        fullName: string;
        avatar: string;
        email: string;
      };
    }
  >;
  updateAvatar: Action<this, { avatar: string }>;
}

const User: UserModel = {
  profile: {
    firstName: "",
    lastName: "",
    fullName: "",
    avatar: "",
    email: "",
  },
  token: "",
  isAuth: false,
  saveToken: action((state, payload) => {
    const oldState = state;
    oldState.token = payload.token;
    oldState.profile = payload.profile;
    oldState.isAuth = true;
  }),
  logOut: action((state) => {
    const oldState = state;
    oldState.isAuth = false;
    oldState.token = "";
  }),
  updateProfile: action((state, payload) => {
    const oldState = state;
    oldState.profile = payload.profile;
  }),
  updateAvatar: action((state, payload) => {
    const oldState = state;
    oldState.profile.avatar = payload.avatar;
  }),
};

export default User;
