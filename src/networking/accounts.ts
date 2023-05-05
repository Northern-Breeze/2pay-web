import Axios from "./adaptor";

export class Accounts {
    static getAccounts() {
        return Axios.get('/account')
    }
    static makeDefaultAccount(id: number | undefined) {
        return Axios.post(`/account/default/${id}`)
    }

    static deleteAccount(id: number) {
        return Axios.delete(`/account/${id}`);
    }
}