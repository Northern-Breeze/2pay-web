import { action, Action } from "easy-peasy";


export interface Account {
  name: string;
  address: string;
}
export interface Profile {
  firstName: string,
  lastName: string,
  fullName: string,
  avatar: string,
  email: string,
  accounts: Account[]
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
    {   type: 'NAMES' | 'PROFILE'
        firstName: string;
        lastName: string;
        fullName: string;
        avatar: string;
        email: string;
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
    switch (payload.type) {
      case 'NAMES':        
          oldState.profile.firstName = payload.firstName;
          oldState.profile.lastName = payload.lastName;
        break;
      case 'PROFILE':
        oldState.profile.avatar = payload.avatar
        break;
      default:
        break;
    }
  }),
  updateAvatar: action((state, payload) => {
    const oldState = state;
    oldState.profile.avatar = payload.avatar;
  }),
};

export default model;
