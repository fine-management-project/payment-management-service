import { Inject, Injectable } from '@nestjs/common';
import { PaymentAttemptRepository } from 'src/modules/payment-attempt/repositories/payment-attempt.repository';
import {
  FinesSortingOptions,
  IAdminPaymentAttemptRepository,
  IGetPaymentAttemptsFilters,
} from '../interfaces/admin-payment-attempt.repository.interface';
import { GetPaymentAttemptsRequest } from '../dtos/requests/payment-attempt/get-payment-attempts.request';
import { PaymentAttempt as PaymentAttemptEntity } from '../domain/entities/payment-attempt.entity';
import { ICountedData } from 'src/common/interfaces/counted-data.interface';
import { Param } from 'src/common/value-objects/param.vo';
import { SortingOptions } from 'src/common/value-objects/sorting-options.vo';
import { PaginationOptions } from 'src/common/value-objects/pagination-options.vo';
import { PaymentAttemptStatus } from '../domain/value-objects/payment-attempt-status.vo';

@Injectable()
export class AdminPaymentAttemptService {
  constructor(
    @Inject(PaymentAttemptRepository)
    private readonly paymentAttemptRepository: IAdminPaymentAttemptRepository,
  ) {}

  async getPaymentAttempts(
    requestBody: GetPaymentAttemptsRequest,
  ): Promise<ICountedData<PaymentAttemptEntity>> {
    const pagination = new PaginationOptions(
      requestBody.paginationOptions?.limit,
      requestBody.paginationOptions?.offset,
    );

    let sortingOptions: FinesSortingOptions | undefined = undefined;

    if (requestBody.sortingOptions)
      sortingOptions = new SortingOptions(
        new Param(requestBody.sortingOptions.key),
        requestBody.sortingOptions.direction,
      );

    const filters: IGetPaymentAttemptsFilters = {};

    if (requestBody.filters?.status) {
      filters.status = new PaymentAttemptStatus(requestBody.filters.status);
    }

    return this.paymentAttemptRepository.getPaymentAttempts(
      filters,
      pagination,
      sortingOptions,
    );
  }
}
