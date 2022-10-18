import Axios from "./adaptor";

class Server {
  static fetchUser() {
    return Axios.get("/users");
  }
  static verifyPayment(data: { token: string; id: number, source: string }) {
    return Axios.post("/transaction/verify_payment", {
      reference: data.token,
      userId: data.id,
      source: data.source
    });
  }

  static async signInUser(data: { email: string; password: string }) {
    const { email, password } = data;
    return Axios.post("/auth/login", {
      email,
      password,
    });
  }

  /**
   * This function register a user to the service
   * @param data { firstName: string, lastName: string, email: string, password: string }
   * @returns
   */
  static registerUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const { firstName, lastName, email, password } = data;
    return Axios.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
  }
  static fetchUserInfo(
    token: string
  ): Promise<{ data: { success: boolean } }> {
    return Axios.get("/profile/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static updateProfile(data: any, token: string) {
    return Axios.put(
      "/profile/update",
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  static updateImage(uri: string, name: string, token: string) {
    return Axios.put(
      "/profile/update-image",
      {
        uri,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  static fetchAccounts(token: string) {
    return Axios.get("/profile/accounts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static generateQRCode(
    token: string,
    payload: { amount: number; currency: string }
  ) {
    return Axios.post(
      "/profile/generate-qrc",
      {
        amount: payload.amount,
        currency: payload.currency,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  static verifyAccount(token: string) {
    return Axios.post(
      "/auth/verify_account",
      {
        token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  static passwordUpdateRequest(email: string) {
    return Axios.post("/auth/password_request", {
      email,
    });
  }
  static updatePassword(password: string, token: string) {
    return Axios.put("/auth/update_password", {
      password,
      token,
    });
  }

  static getNotification() {
    return Axios.get("/users/notifications");
  }

  static getTransactions () {
    return Axios.get('/users/transactions')
  }
}

export default Server;
