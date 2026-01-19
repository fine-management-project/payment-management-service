import { BaseEventProducerService } from 'src/integrations/events/producer/base.event-producer.service';
import { FineId } from 'src/modules/fine/domain/value-objects/fine-id.vo';
import { FinePaymentProcessingEventDto } from './dtos/fine-payment-processing-event.dto';
import { FinePaymentSuccessEventDto } from './dtos/fine-payment-success-event.dto';
import { FinePaymentFailedEventDto } from './dtos/fine-payment-failed-event.dto';

export class PaymentAttemptNotificationsService extends BaseEventProducerService {
  constructor() {
    super();
  }

  async sendFinePaymentProcessing(fineId: FineId) {
    const finePaymentProcessingEventDto = new FinePaymentProcessingEventDto({
      fineId: fineId.value,
    });

    await this.publishEvent(finePaymentProcessingEventDto);
  }

  async sendFinePaymentSuccess(fineId: FineId) {
    const finePaymentSuccessEventDto = new FinePaymentSuccessEventDto({
      fineId: fineId.value,
    });

    await this.publishEvent(finePaymentSuccessEventDto);
  }

  async sendFinePaymentFailed(fineId: FineId) {
    const finePaymentFailedEventDto = new FinePaymentFailedEventDto({
      fineId: fineId.value,
    });

    await this.publishEvent(finePaymentFailedEventDto);
  }
}
