import { EntityId } from 'src/common/value-objects/entity-id.vo';

export class FineId extends EntityId {
  constructor(value: string) {
    super(value);
  }

  static create(value?: string): FineId {
    return new FineId(value || EntityId.generateId());
  }
}
