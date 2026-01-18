import { IInternalPaymentAttemptRepository } from '../interfaces/internal-payment-attempt.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentAttemptRepository } from '../repositories/payment-attempt.repository';
import { StripeService } from 'src/integrations/stripe/stripe.service';
import { FineId } from 'src/modules/fine/domain/value-objects/fine-id.vo';
import { FineService } from 'src/modules/fine/fine.service';
import { PaymentAttemptId } from '../domain/value-objects/payment-attempt-id.vo';
import { PaymentAttempt as PaymentAttemptEntity } from '../domain/entities/payment-attempt.entity';
import { PaymentIntentId } from '../domain/value-objects/payment-intent-id.vo';
import { PaymentAttemptStatusEnum } from '../domain/enum/payment-attempt-status.enum';
import { PaymentAttemptStatus } from '../domain/value-objects/payment-attempt-status.vo';
import {
  CannotCreateCorrectPaymentIntentForFineException,
  CannotCreatePaymentAttemptException,
  CannotUpdatePaymentAttemptException,
} from '../exceptions/payment-attempt.service.exceptions';
import { IPaymentAttemptRepository } from '../interfaces/payment-attempt.repository.interface';
import { CannotFindPaymentAttemptException } from '../exceptions/common.exceptions';
import { Request } from 'express';
import { LOGGER_SERVICE } from 'src/common/shared/constants';
import { ILoggerService } from 'src/common/logger/logger.types';
import { FineCannotBePaidException } from '../exceptions/pay.service.exceptions';

@Injectable()
export class PayService {
  constructor(
    @Inject(PaymentAttemptRepository)
    private readonly paymentAttemptRepository: IInternalPaymentAttemptRepository &
      IPaymentAttemptRepository,
    private readonly stripeService: StripeService,
    private readonly fineService: FineService,
    @Inject(LOGGER_SERVICE)
    protected readonly loggerService: ILoggerService,
  ) {
    setTimeout(() => {
      this.loggerService.setContext(this.constructor.name);
    }, 0);
  }

  async requestFinePaymentById(id: string): Promise<string> {
    const fineId = new FineId(id);

    const fine = await this.fineService.getFineById(fineId);

    if (!fine.canBePaid()) throw new FineCannotBePaidException();

    const paymentAttemptId = PaymentAttemptId.create();

    const paymentIntent = await this.stripeService.createIntent(
      fine,
      paymentAttemptId,
    );

    if (!paymentIntent.client_secret)
      throw new CannotCreateCorrectPaymentIntentForFineException();

    const paymentAttempt = new PaymentAttemptEntity(
      paymentAttemptId,
      new PaymentIntentId(paymentIntent.id),
      fine.id,
      new PaymentAttemptStatus(PaymentAttemptStatusEnum.PENDING),
    );

    const createdPaymentAttempt =
      this.paymentAttemptRepository.createPaymentAttempt(paymentAttempt);

    if (!createdPaymentAttempt) throw new CannotCreatePaymentAttemptException();

    return paymentIntent.client_secret;
  }

  async handleStripeWebhook(request: Request, signature?: string) {
    try {
      const event = this.stripeService.constructEvent(request, signature);

      if (event.type === 'payment_intent.succeeded') {
        const intent = event.data.object;
        const { paymentAttemptId } = intent.metadata;

        await this.handleSuccessfulPayment(paymentAttemptId);
      }

      if (event.type === 'payment_intent.payment_failed') {
        const intent = event.data.object;
        const { paymentAttemptId } = intent.metadata;

        await this.handleFailedPayment(paymentAttemptId);
      }
    } catch (e) {
      this.loggerService.error({
        message: e,
      });
    }
  }

  private async handleSuccessfulPayment(paymentAttemptId: string) {
    const convertedPaymentAttemptId = new PaymentAttemptId(paymentAttemptId);
    console.log('handleSuccessfulPayment', paymentAttemptId);

    const paymentAttempt =
      await this.paymentAttemptRepository.getPaymentAttemptById(
        convertedPaymentAttemptId,
      );

    if (!paymentAttempt) throw new CannotFindPaymentAttemptException();

    paymentAttempt.updateStatus(
      new PaymentAttemptStatus(PaymentAttemptStatusEnum.SUCCESS),
    );

    const updatedPaymentAttempt =
      await this.paymentAttemptRepository.updatePaymentAttempt(paymentAttempt);

    if (!updatedPaymentAttempt) throw new CannotUpdatePaymentAttemptException();
  }

  private async handleFailedPayment(paymentAttemptId: string) {
    const convertedPaymentAttemptId = new PaymentAttemptId(paymentAttemptId);

    const paymentAttempt =
      await this.paymentAttemptRepository.getPaymentAttemptById(
        convertedPaymentAttemptId,
      );

    if (!paymentAttempt) throw new CannotFindPaymentAttemptException();

    paymentAttempt.updateStatus(
      new PaymentAttemptStatus(PaymentAttemptStatusEnum.FAILED),
    );

    const updatedPaymentAttempt =
      await this.paymentAttemptRepository.updatePaymentAttempt(paymentAttempt);

    if (!updatedPaymentAttempt) throw new CannotUpdatePaymentAttemptException();
  }
}
