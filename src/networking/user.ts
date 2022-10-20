import Axios from "./adaptor";

export class Users {
  static getNotification() {
    return Axios.get("/users/notifications");
  }
  static fetchUser() {
    return Axios.get("/users");
  }
  static getTransactions() {
    return Axios.get("/users/transactions");
  }
  static updateProfile(data: any) {
    return Axios.put("/user/update", {
      ...data,
    });
  }
}
