import Axios from "./adaptor";

export class Transactions {
  static verifyPayment(data: { token: string; id: number; source: string }) {
    return Axios.post("/transaction/verify_payment", {
      reference: data.token,
      userId: data.id,
      source: data.source,
    });
  }
  static getPaymentLink(
    email: string,
    amount: number,
    currency: string,
    callbackUrl: string
  ) {
    return Axios.post("/transaction/create/link", {
      email,
      amount,
      currency,
      callbackUrl,
    });
  }
  static generateQRCode(payload: { amount: number; currency: string }) {
    return Axios.post("/transaction/create/qrcode", {
      amount: payload.amount,
      currency: payload.currency,
    });
  }
}
