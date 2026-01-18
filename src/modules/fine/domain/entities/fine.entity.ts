import { UserId } from 'src/common/value-objects/user-id.vo';
import { Currency } from '../enums/currency.enum';
import { FineStatusEnum } from '../enums/fine-status.enum';
import { Amount } from '../value-objects/amount.vo';
import { FineId } from '../value-objects/fine-id.vo';

export class Fine {
  constructor(
    private readonly _id: FineId,
    private readonly _userId: UserId,
    private readonly _amount: Amount,
    private readonly _currency: Currency,
    private readonly _status: FineStatusEnum,
  ) {}

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get amount() {
    return this._amount;
  }

  get currency() {
    return this._currency;
  }

  get status() {
    return this._status;
  }

  toString() {
    return `Fine: ${this.id.toString()}\r\n${this.userId.toString()}\r\n${this.amount.toString()}\r\nCurrency: ${this.currency}\r\nStatus: ${this.status}`;
  }
}
