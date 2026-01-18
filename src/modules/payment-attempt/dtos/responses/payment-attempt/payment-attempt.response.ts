import { ApiProperty } from '@nestjs/swagger';
import { PaymentAttemptStatusEnum } from '../../../domain/enum/payment-attempt-status.enum';

export class BasicPaymentResponse {
  @ApiProperty({
    description: 'Payment Attempt Id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id!: string;

  @ApiProperty({
    description: 'Payment Intent Id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  paymentIntentId!: string;

  @ApiProperty({
    description: 'Fine Id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  fineId!: string;

  @ApiProperty({
    description: 'Status',
    example: 'PENDING, FAILED, SUCCESS.',
  })
  status!: PaymentAttemptStatusEnum;

  @ApiProperty({
    description: 'Fine creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt!: string;

  @ApiProperty({
    description: 'Fine last update timestamp',
    example: '2024-01-01T12:00:00.000Z',
  })
  updatedAt!: string;
}
