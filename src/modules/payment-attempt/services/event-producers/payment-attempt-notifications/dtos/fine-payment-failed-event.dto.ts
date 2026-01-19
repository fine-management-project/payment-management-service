import { BaseEventDto } from 'src/integrations/events/base.event.dto';
import {
  PaymentManagementServiceEvents,
  ProducerService,
} from 'src/integrations/events/types';

export type FinePaymentFailedEventData = {
  fineId: string;
};

export class FinePaymentFailedEventDto extends BaseEventDto<
  FinePaymentFailedEventData,
  ProducerService.paymentManagementService
> {
  constructor(payload: FinePaymentFailedEventData) {
    super(
      PaymentManagementServiceEvents.FinePaymentFailed,
      ProducerService.paymentManagementService,
    );

    this._payload = payload;
  }
}
