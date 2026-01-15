import { EntityId } from 'src/сommon/value-objects/entity-id.vo';

export class PaymentAttemptId extends EntityId {
  constructor(value: string) {
    super(value);
  }

  static create(value?: string): PaymentAttemptId {
    return new PaymentAttemptId(value || EntityId.generateId());
  }
}
