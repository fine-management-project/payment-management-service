import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/common/exceptions/domain-exception';

export class CannotFindPaymentAttemptException extends DomainException {
  constructor() {
    super('Cannot find the requested payment attempt!', HttpStatus.BAD_REQUEST);
  }
}
