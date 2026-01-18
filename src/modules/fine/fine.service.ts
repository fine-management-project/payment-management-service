import { Injectable } from '@nestjs/common';
import { FineManagementServiceService } from 'src/integrations/fine-management-service/fine-management-service.service';
import { FineId } from './domain/value-objects/fine-id.vo';
import { Fine, Fine as FineEntity } from './domain/entities/fine.entity';
import { Amount } from './domain/value-objects/amount.vo';
import { UserId } from 'src/common/value-objects/user-id.vo';

@Injectable()
export class FineService {
  constructor(
    private readonly fineManagementServiceService: FineManagementServiceService,
  ) {}

  async getFineById(id: FineId): Promise<FineEntity> {
    const fineDto = await this.fineManagementServiceService.getFineById(id);

    const fineId = new FineId(fineDto.id);
    const userId = new UserId(fineDto.userId);
    const amount = new Amount(fineDto.amount);

    const fine = new Fine(
      fineId,
      userId,
      amount,
      fineDto.currency,
      fineDto.status,
    );

    return fine;
  }
}
