import { PaymentAttempt as PaymentAttemptEntity } from '../domain/entities/payment-attempt.entity';

export interface IInternalPaymentAttemptRepository {
  createPaymentAttempt(
    paymentAttempt: PaymentAttemptEntity,
  ): Promise<PaymentAttemptEntity | null>;
  updatePaymentAttempt(
    paymentAttempt: PaymentAttemptEntity,
  ): Promise<PaymentAttemptEntity | null>;
}
