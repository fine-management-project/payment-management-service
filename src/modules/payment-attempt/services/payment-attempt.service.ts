import { Inject, Injectable } from '@nestjs/common';
import { PaymentAttemptRepository } from 'src/modules/payment-attempt/repositories/payment-attempt.repository';
import { IPaymentAttemptRepository } from '../interfaces/payment-attempt.repository.interface';
import { PaymentAttemptId } from '../domain/value-objects/payment-attempt-id.vo';
import { PaymentAttempt as PaymentAttemptEntity } from '../domain/entities/payment-attempt.entity';
import { CannotFindPaymentAttemptException } from '../exceptions/common.exceptions';
import { AuthUser } from 'src/common/types/express';
import { FineService } from 'src/modules/fine/fine.service';
import { UserAccessService } from 'src/common/services/user-access.service';
import { UserId } from 'src/common/value-objects/user-id.vo';
import { ForbiddenToProcessFineException } from 'src/common/exceptions/service/user-access.service.exceptions';

@Injectable()
export class PaymentAttemptService {
  constructor(
    @Inject(PaymentAttemptRepository)
    private readonly paymentAttemptRepository: IPaymentAttemptRepository,
    private readonly fineService: FineService,
    private readonly userAccessService: UserAccessService,
  ) {}

  async getPaymentAttemptById(
    id: string,
    user?: AuthUser,
  ): Promise<PaymentAttemptEntity> {
    const paymentAttemptId = new PaymentAttemptId(id);

    const paymentAttempt =
      await this.paymentAttemptRepository.getPaymentAttemptById(
        paymentAttemptId,
      );

    if (!paymentAttempt) throw new CannotFindPaymentAttemptException();

    const fine = await this.fineService.getFineById(paymentAttempt.fineId);

    const canUserProcessFine = this.userAccessService.canUserProcessFine(
      fine,
      new UserId(user?.['user/id'] ?? ''),
      user?.['user/roles'] ?? [],
    );

    if (!canUserProcessFine) throw new ForbiddenToProcessFineException();

    return paymentAttempt;
  }
}
