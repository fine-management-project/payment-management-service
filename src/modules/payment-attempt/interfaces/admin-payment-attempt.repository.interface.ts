import { PaginationOptions } from 'src/common/value-objects/pagination-options.vo';
import { SortingOptions } from 'src/common/value-objects/sorting-options.vo';
import { ICountedData } from 'src/common/interfaces/counted-data.interface';
import { PaymentAttemptStatus } from '../domain/value-objects/payment-attempt-status.vo';
import { PaymentAttempt as PaymentAttemptEntity } from '../domain/entities/payment-attempt.entity';
import { PaymentAttemptId } from '../domain/value-objects/payment-attempt-id.vo';

export interface IGetPaymentAttemptsFilters {
  status?: PaymentAttemptStatus;
}

export type FinesSortingOptions = SortingOptions<
  'id' | 'createdAt' | 'updatedAt'
>;

export interface IAdminPaymentAttemptRepository {
  getPaymentAttempts(
    filters: IGetPaymentAttemptsFilters,
    pagination?: PaginationOptions,
    sorting?: FinesSortingOptions,
  ): Promise<ICountedData<PaymentAttemptEntity>>;
  deletePaymentAttempt(id: PaymentAttemptId): Promise<void>;
}
