import { MessageAttributeValue } from '@aws-sdk/client-sqs';
import { EVENT_TYPE_ATTRIBUTE, PRODUCER_SERVICE_ATTRIBUTE } from './constants';
import { ProducerService, ServiceEventMap } from './types';

export abstract class BaseEventDto<Payload, Service extends ProducerService> {
  protected _payload: Payload;

  constructor(
    private readonly _type: ServiceEventMap[Service],
    private readonly _producerService: Service,
  ) {}

  get payload() {
    return this._payload;
  }

  get type() {
    return this._type;
  }

  get producerService() {
    return this._producerService;
  }

  getMessageAttributes(): Record<string, MessageAttributeValue> {
    return {
      [EVENT_TYPE_ATTRIBUTE]: { DataType: 'String', StringValue: this.type },
      [PRODUCER_SERVICE_ATTRIBUTE]: {
        DataType: 'String',
        StringValue: this.producerService,
      },
    };
  }

  getPayloadJSON() {
    return JSON.stringify(this.payload, null, 2);
  }

  toString() {
    return `[Producer Service]: ${this.producerService}\r\n
            [Event Type]: ${this.type}\r\n
            [Payload]: ${this.getPayloadJSON()}`;
  }
}
