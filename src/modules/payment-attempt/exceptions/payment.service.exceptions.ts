import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/common/exceptions/domain-exception';

export class CannotCreatePaymentAttemptException extends DomainException {
  constructor() {
    super('Cannot create a payment attempt!', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class CannotUpdatePaymentAttemptException extends DomainException {
  constructor() {
    super(
      'Cannot update the payment attempt!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class CannotCreateCorrectPaymentIntentForFineException extends DomainException {
  constructor() {
    super(
      'Cannot create a correct payment intent!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
