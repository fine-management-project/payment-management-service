import { EntityId } from 'src/сommon/value-objects/entity-id.vo';

export class FineId extends EntityId {
  constructor(value: string) {
    super(value);
  }

  static create(value?: string): FineId {
    return new FineId(value || EntityId.generateId());
  }
}
