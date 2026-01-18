import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/common/exceptions/domain-exception';

export class InvalidAmountException extends DomainException {
  constructor() {
    super('Amount to pay should be greater than 0!', HttpStatus.BAD_REQUEST);
  }
}
