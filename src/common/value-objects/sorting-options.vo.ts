import { Param } from './param.vo';

export enum SortingDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class SortingOptions<T extends string> {
  private readonly _param: Param<T>;
  private readonly _direction: SortingDirection;

  constructor(param: Param<T>, direction: SortingDirection) {
    this._param = param;
    this._direction = direction;
  }

  // Getters
  get param() {
    return this._param;
  }

  get direction() {
    return this._direction;
  }

  toString() {
    return `Sorting Options: param (${this.param.toString()}) - ${
      this.direction
    }`;
  }
}
