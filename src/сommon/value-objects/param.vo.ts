import { EmptyParamException } from '../exceptions/value-objects/param.vo.exception';

export class Param<T extends string> {
  private readonly _value: T;

  constructor(value: T) {
    this.validate(value);
    this._value = value;
  }

  // Getter
  get value() {
    return this._value;
  }

  private validate(value: T) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      throw new EmptyParamException();
    }
  }

  toString() {
    return `Param: ${this.value}`;
  }
}
