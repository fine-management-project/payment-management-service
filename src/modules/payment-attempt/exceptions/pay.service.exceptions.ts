import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/common/exceptions/domain-exception';

export class FineCannotBePaidException extends DomainException {
  constructor() {
    super('Fine is not ready to be paid!', HttpStatus.BAD_REQUEST);
  }
}
