import { EntityId } from 'src/common/value-objects/entity-id.vo';

export class PaymentIntentId extends EntityId {
  constructor(value: string) {
    super(value);
  }

  static create(value?: string): PaymentIntentId {
    return new PaymentIntentId(value || EntityId.generateId());
  }
}
