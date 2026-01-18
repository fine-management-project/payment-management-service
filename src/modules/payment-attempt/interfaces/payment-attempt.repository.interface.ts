import { PaymentAttempt as PaymentAttemptEntity } from '../domain/entities/payment-attempt.entity';
import { PaymentAttemptId } from '../domain/value-objects/payment-attempt-id.vo';

export interface IPaymentAttemptRepository {
  getPaymentAttemptById: (
    id: PaymentAttemptId,
  ) => Promise<PaymentAttemptEntity | null>;
}
