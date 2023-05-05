import { action, Action } from "easy-peasy";

export interface Account {
  id: number;
  name: string;
  accountNumber: string;
  isDefault: boolean;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  avatar: string;
  accounts: Account[];
}
export interface Model {
  profile: Profile;
  token: string;
  isAuth: boolean;
  saveToken: Action<
    this,
    {
      token: string;
      profile: Profile;
    }
  >;
  logOut: Action<this>;
  updateProfile: Action<
    this,
    {
      profile: Profile;
    }
  >;
  updateAvatar: Action<this, { avatar: string }>;
}

const model: Model = {
  profile: {
    firstName: "",
    lastName: "",
    fullName: "",
    avatar: "",
    email: "",
    accounts: []
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

export default model;
