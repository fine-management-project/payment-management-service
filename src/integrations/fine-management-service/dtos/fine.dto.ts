import { Currency } from 'src/modules/fine/domain/enums/currency.enum';
import { FineStatusEnum } from 'src/modules/fine/domain/enums/fine-status.enum';

export class FineDto {
  id: string;
  userId: string;
  currency: Currency;
  amount: number;
  status: FineStatusEnum;
  createdAt: string;
  updatedAt: string;
}
