import { PaymentAttempt as PaymentAttemptEntity } from '../../domain/entities/payment-attempt.entity';
import { BasicPaymentResponse } from '../../dtos/responses/payment-attempt/payment-attempt.response';

export class PaymentAttemptResponseMapper {
  static toBasicPaymentAttemptResponse(
    entity: PaymentAttemptEntity,
  ): BasicPaymentResponse {
    return {
      id: entity.id.value,
      paymentIntentId: entity.paymentIntentId.value,
      fineId: entity.paymentIntentId.value,
      status: entity.status.value,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
