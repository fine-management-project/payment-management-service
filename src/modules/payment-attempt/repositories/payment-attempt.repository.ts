import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repository/base.repository';
import { PaymentAttempt as PaymentAttemptDB } from 'src/integrations/generated/prisma/browser';
import { PrismaService } from 'src/integrations/prisma/prisma.service';
import { PaymentAttempt as PaymentAttemptEntity } from 'src/modules/payment-attempt/domain/entities/payment-attempt.entity';
import { generatedPaymentAttemptStatusToPaymentAttemptStatusMap } from '../mappers/domain/payment-attempt-status.mapper';
import { PaymentAttemptId } from 'src/modules/payment-attempt/domain/value-objects/payment-attempt-id.vo';
import {
  FinesSortingOptions,
  IAdminPaymentAttemptRepository,
  IGetPaymentAttemptsFilters,
} from 'src/modules/payment-attempt/interfaces/admin-payment-attempt.repository.interface';
import { PaginationOptions } from 'src/common/value-objects/pagination-options.vo';
import { SortingDirection } from 'src/common/value-objects/sorting-options.vo';
import { IPaymentAttemptRepository } from 'src/modules/payment-attempt/interfaces/payment-attempt.repository.interface';
import { IInternalPaymentAttemptRepository } from 'src/modules/payment-attempt/interfaces/internal-payment-attempt.repository.interface';
import { ICountedData } from 'src/common/interfaces/counted-data.interface';

@Injectable()
export class PaymentAttemptRepository
  extends BaseRepository<PaymentAttemptEntity>
  implements
    IAdminPaymentAttemptRepository,
    IPaymentAttemptRepository,
    IInternalPaymentAttemptRepository
{
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async getPaymentAttemptById(id: PaymentAttemptId) {
    return this.executeOperation(
      'get payment attempt by id',
      async (): Promise<PaymentAttemptEntity | null> => {
        const fine: PaymentAttemptDB | null =
          await this.prismaService.paymentAttempt.findUnique({
            where: {
              id: id.value,
            },
          });

        return fine ? this.mapToEntity(fine) : null;
      },
    );
  }

  async getPaymentAttempts(
    filters: IGetPaymentAttemptsFilters,
    pagination?: PaginationOptions,
    sorting?: FinesSortingOptions,
  ) {
    return this.executeOperation(
      'get payment attempts',
      async (): Promise<ICountedData<PaymentAttemptEntity>> => {
        const sortingParam = sorting?.param ? sorting?.param.value : undefined;
        const orderBy = {};

        if (sortingParam) {
          orderBy[sortingParam] = sorting?.direction ?? SortingDirection.DESC;
        }

        const filter = {
          status: filters.status?.value,
        };

        const [total, paymentAttempts] = await this.prismaService.$transaction([
          this.prismaService.paymentAttempt.count({ where: filter }),
          this.prismaService.paymentAttempt.findMany({
            where: filter,
            skip: pagination?.offset,
            take: pagination?.limit,
            orderBy,
          }),
        ]);

        return { data: paymentAttempts.map(this.mapToEntity), total };
      },
    );
  }

  deletePaymentAttempt(id: PaymentAttemptId): Promise<void> {
    return this.executeOperation(
      'delete payment attempt',
      async (): Promise<void> => {
        await this.prismaService.paymentAttempt.delete({
          where: {
            id: id.value,
          },
        });
      },
    );
  }

  createPaymentAttempt(
    payload: PaymentAttemptEntity,
  ): Promise<PaymentAttemptEntity | null> {
    return this.executeOperation(
      'create payment attempt',
      async (): Promise<PaymentAttemptEntity | null> => {
        const paymentAttempt: PaymentAttemptDB | null =
          await this.prismaService.paymentAttempt.create({
            data: {
              id: payload.id.value,
              paymentIntentId: payload.paymentIntentId.value,
              fineId: payload.fineId.value,
              status: payload.status.value,
            },
          });

        return paymentAttempt ? this.mapToEntity(paymentAttempt) : null;
      },
    );
  }

  updatePaymentAttempt(
    payload: PaymentAttemptEntity,
  ): Promise<PaymentAttemptEntity | null> {
    return this.executeOperation(
      'create payment attempt',
      async (): Promise<PaymentAttemptEntity | null> => {
        const paymentAttempt: PaymentAttemptDB | null =
          await this.prismaService.paymentAttempt.update({
            data: {
              id: payload.id.value,
              paymentIntentId: payload.paymentIntentId.value,
              fineId: payload.fineId.value,
              status: payload.status.value,
            },
            where: {
              id: payload.id.value,
            },
          });

        return paymentAttempt ? this.mapToEntity(paymentAttempt) : null;
      },
    );
  }

  protected mapToEntity(value: PaymentAttemptDB): PaymentAttemptEntity {
    return PaymentAttemptEntity.fromData({
      ...value,
      status:
        generatedPaymentAttemptStatusToPaymentAttemptStatusMap[value.status],
    });
  }
}
