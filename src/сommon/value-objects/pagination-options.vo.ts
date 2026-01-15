import {
  InvalidPaginationValueException,
  ParameterShouldBeIntegerException,
} from '../exceptions/value-objects/pagination-options.vo.exception';

export const DEFAULT_LIMIT = 20;
export const DEFAULT_OFFSET = 0;

export class PaginationOptions {
  private readonly _limit: number;
  private readonly _offset: number;

  constructor(limit: number = DEFAULT_LIMIT, offset: number = DEFAULT_OFFSET) {
    this.validate(limit, offset);
    this._limit = limit;
    this._offset = offset;
  }

  // Getters
  get limit() {
    return this._limit;
  }

  get offset() {
    return this._offset;
  }

  // Business logic
  private validate(limit: number, offset: number) {
    if (!Number.isInteger(limit)) {
      throw new ParameterShouldBeIntegerException('Limit');
    }

    if (!Number.isInteger(offset)) {
      throw new ParameterShouldBeIntegerException('Offset');
    }

    if (limit < 0) {
      throw new InvalidPaginationValueException('Limit');
    }

    if (offset < 0) {
      throw new InvalidPaginationValueException('Offset');
    }
  }

  toString() {
    return `Pagination Options: limit (${this.limit}), offset (${this.offset})`;
  }
}
