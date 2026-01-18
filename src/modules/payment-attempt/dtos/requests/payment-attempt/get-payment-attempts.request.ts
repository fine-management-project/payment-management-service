import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  PaginationOptionsDto,
  SortingOptionsDto,
} from 'src/common/requests/base.request';
import { PaymentAttemptStatusEnum } from 'src/modules/payment-attempt/domain/enum/payment-attempt-status.enum';

type GetPaymentAttemptsSortingParams = 'id' | 'createdAt' | 'updatedAt';

export class GetPaymentAttemptsFilters {
  @ApiProperty({
    description: 'Status',
    example: 'PENDING, FAILED, SUCCESS.',
  })
  @IsString()
  status!: PaymentAttemptStatusEnum;
}

export class GetPaymentAttemptsRequest {
  @ApiProperty({
    description: 'Pagination options',
  })
  paginationOptions?: PaginationOptionsDto;

  @ApiProperty({
    description: 'Sorting options',
  })
  sortingOptions?: SortingOptionsDto<GetPaymentAttemptsSortingParams>;

  @ApiProperty({
    description: 'Filtering options',
  })
  filters?: GetPaymentAttemptsFilters;
}
