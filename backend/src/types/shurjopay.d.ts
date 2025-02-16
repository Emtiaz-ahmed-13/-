declare module 'shurjopay' {
  export interface PaymentResponse {
    transactionStatus: any;
    sp_order_id: any;
    checkout_url: any;
  }

  export interface VerificationResponse {
    sp_code: unknown;
    sp_message: unknown;
    transaction_status: unknown;
    method: unknown;
    date_time: unknown;
    bank_status: unknown;
  }

  export default class Shurjopay {
    config(
      endpoint: string,
      username: string,
      password: string,
      prefix: string,
      returnUrl: string,
    ): void;

    makePayment(
      paymentPayload: any,
      onSuccess: (response: PaymentResponse) => void,
      onError: (error: any) => void,
    ): void;

    verifyPayment(
      orderId: string,
      onSuccess: (response: VerificationResponse[]) => void,
      onError: (error: any) => void,
    ): void;
  }
}
