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
    static fetchVerifiedAccounts() {
        return Axios.get('/account/external-verified')
    }
    static linkAccount(data: { bankCode: string, accountNumber: string }) {
        return Axios.post('/account', {
            bankCode: data.bankCode,
            accountNumber: data.accountNumber
        })
    }
}