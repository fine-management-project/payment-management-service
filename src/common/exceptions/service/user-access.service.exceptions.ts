import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/common/exceptions/domain-exception';

export class ForbiddenToProcessFineException extends DomainException {
  constructor() {
    super(
      'It is forbidden to process for the current user!',
      HttpStatus.FORBIDDEN,
    );
  }
}
