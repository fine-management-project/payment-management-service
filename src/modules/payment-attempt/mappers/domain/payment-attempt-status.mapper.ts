import { PaymentAttemptStatus as GeneratedPaymentAttemptStatus } from 'src/integrations/generated/prisma/enums';
import { PaymentAttemptStatusEnum } from 'src/modules/payment-attempt/domain/enum/payment-attempt-status.enum';

export const generatedPaymentAttemptStatusToPaymentAttemptStatusMap: Record<
  GeneratedPaymentAttemptStatus,
  PaymentAttemptStatusEnum
> = {
  [GeneratedPaymentAttemptStatus.FAILED]: PaymentAttemptStatusEnum.FAILED,
  [GeneratedPaymentAttemptStatus.PENDING]: PaymentAttemptStatusEnum.PENDING,
  [GeneratedPaymentAttemptStatus.SUCCESS]: PaymentAttemptStatusEnum.SUCCESS,
} as const;
