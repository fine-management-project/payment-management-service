import { BaseEventDto } from 'src/integrations/events/base.event.dto';
import {
  PaymentManagementServiceEvents,
  ProducerService,
} from 'src/integrations/events/types';

export type FinePaymentSuccessEventData = {
  fineId: string;
};

export class FinePaymentSuccessEventDto extends BaseEventDto<
  FinePaymentSuccessEventData,
  ProducerService.paymentManagementService
> {
  constructor(payload: FinePaymentSuccessEventData) {
    super(
      PaymentManagementServiceEvents.FinePaidSuccess,
      ProducerService.paymentManagementService,
    );

    this._payload = payload;
  }
}
