import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/common/exceptions/domain-exception';

export class CannotChangePaymentAttemptStatusException extends DomainException {
  constructor(newStatus: string, oldStatus: string) {
    super(
      `Cannot set ${newStatus} status for payment attempt with ${oldStatus} status.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
