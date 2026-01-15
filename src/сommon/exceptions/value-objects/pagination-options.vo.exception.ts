import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain-exception';

export class InvalidPaginationValueException extends DomainException {
  constructor(param: string) {
    super(`${param} cannot be less than 0!`, HttpStatus.BAD_REQUEST);
  }
}

export class ParameterShouldBeIntegerException extends DomainException {
  constructor(param: string) {
    super(`${param} should be integer!`, HttpStatus.BAD_REQUEST);
  }
}
