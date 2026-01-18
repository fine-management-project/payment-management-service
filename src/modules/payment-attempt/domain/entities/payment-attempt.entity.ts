import { FineId } from '../../../fine/domain/value-objects/fine-id.vo';
import { PaymentAttemptStatusEnum } from '../enum/payment-attempt-status.enum';
import { PaymentAttemptId } from '../value-objects/payment-attempt-id.vo';
import { PaymentAttemptStatus } from '../value-objects/payment-attempt-status.vo';
import { PaymentIntentId } from '../value-objects/payment-intent-id.vo';

export class PaymentAttempt {
  constructor(
    private readonly _id: PaymentAttemptId,
    private readonly _paymentIntentId: PaymentIntentId,
    private readonly _fineId: FineId,
    private _status: PaymentAttemptStatus,
    private readonly _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
  ) {}

  get id() {
    return this._id;
  }

  get paymentIntentId() {
    return this._paymentIntentId;
  }

  get fineId() {
    return this._fineId;
  }

  get status() {
    return this._status;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  static fromData(data: {
    id: string;
    paymentIntentId: string;
    fineId: string;
    status: PaymentAttemptStatusEnum;
    createdAt?: Date;
    updatedAt?: Date;
  }): PaymentAttempt {
    const { id, paymentIntentId, fineId, status, createdAt, updatedAt } = data;

    return new PaymentAttempt(
      new PaymentAttemptId(id),
      new PaymentIntentId(paymentIntentId),
      new FineId(fineId),
      new PaymentAttemptStatus(status),
      createdAt,
      updatedAt,
    );
  }

  updateStatus(newStatus: PaymentAttemptStatus) {
    this._status = newStatus;
    this._updatedAt = new Date();
  }

  toString() {
    return `Payment Attempt: ${this.id.toString()}\r\n${this.paymentIntentId.toString()}\r\n${this.fineId.toString()}\r\n${this.status.toString()}\r\nCreated At: ${this.createdAt.toISOString()}\r\nUpdated At: ${this.updatedAt.toISOString()}`;
  }
}
