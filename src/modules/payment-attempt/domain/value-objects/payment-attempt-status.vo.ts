import { PaymentAttemptStatusEnum } from '../enum/payment-attempt-status.enum';
import { CannotChangePaymentAttemptStatusException } from '../exceptions/value-objects/payment-attempt-status.vo.exceptions';

export class PaymentAttemptStatus {
  constructor(
    private _value: PaymentAttemptStatusEnum = PaymentAttemptStatusEnum.PENDING,
  ) {}

  get value() {
    return this._value;
  }

  validateUpdate(newValue: PaymentAttemptStatus) {
    if (this._value !== PaymentAttemptStatusEnum.PENDING) {
      throw new CannotChangePaymentAttemptStatusException(
        newValue.value,
        this._value,
      );
    }
  }

  toString() {
    return `Payment Attempt Status: ${this.value}`;
  }
}
