import { PaymentAttemptStatusEnum } from '../enum/payment-attempt-status.enum';

export class PaymentAttemptStatus {
  constructor(
    private _value: PaymentAttemptStatusEnum = PaymentAttemptStatusEnum.PENDING,
  ) {}

  get value() {
    return this._value;
  }

  toString() {
    return `Payment Attempt Status: ${this.value}`;
  }
}
