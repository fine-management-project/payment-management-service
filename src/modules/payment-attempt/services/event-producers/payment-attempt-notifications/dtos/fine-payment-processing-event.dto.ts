import { BaseEventDto } from 'src/integrations/events/base.event.dto';
import {
  PaymentManagementServiceEvents,
  ProducerService,
} from 'src/integrations/events/types';

export type FinePaymentProcessingEventData = {
  fineId: string;
};

export class FinePaymentProcessingEventDto extends BaseEventDto<
  FinePaymentProcessingEventData,
  ProducerService.paymentManagementService
> {
  constructor(payload: FinePaymentProcessingEventData) {
    super(
      PaymentManagementServiceEvents.FinePaymentProcessing,
      ProducerService.paymentManagementService,
    );

    this._payload = payload;
  }
}
