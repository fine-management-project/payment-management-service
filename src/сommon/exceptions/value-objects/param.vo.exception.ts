import { HttpStatus } from '@nestjs/common';
import { DomainException } from '../domain-exception';

export class EmptyParamException extends DomainException {
  constructor() {
    super(
      'The empty string cannot be used as a param!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
