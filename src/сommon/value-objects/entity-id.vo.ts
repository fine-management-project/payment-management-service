import { v4 as uuidv4 } from 'uuid';
import { InvalidValueProvidedException } from '../exceptions/common.exceptions';

export abstract class EntityId {
  protected readonly _value: string;

  protected constructor(value: string) {
    this.validate(value);
    this._value = value;
  }

  private validate(value: string) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      throw new InvalidValueProvidedException(
        `Empty value was provided for ${this.constructor.name}!`,
      );
    }
  }

  get value(): string {
    return this._value;
  }

  public isEqual(newValue: EntityId) {
    return (
      this.value === newValue.value &&
      this.constructor.name === newValue.constructor.name
    );
  }

  public static generateId() {
    return uuidv4();
  }

  public toString() {
    return `${this.constructor.name}: ${this.value}`;
  }
}
