import { InvalidAmountException } from '../exceptions/amount.exceptions';

export class Amount {
  private readonly _value: number;

  constructor(value: number) {
    this.validate(value);
    this._value = value;
  }

  // Getters
  get value() {
    return this._value;
  }

  private validate(value: number) {
    if (value <= 0) {
      throw new InvalidAmountException();
    }
  }

  public isEqual(newValue: Amount) {
    return this.value === newValue.value;
  }

  public toString() {
    return `Amount: ${this.value}`;
  }
}
