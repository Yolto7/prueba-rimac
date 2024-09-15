import { UniqueEntityId } from '../valueObject/uniqueEntityId';

const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly uniqueId: UniqueEntityId;
  protected readonly props: T;

  constructor(props: T, id?: UniqueEntityId) {
    this.uniqueId = id || new UniqueEntityId();
    this.props = props;
  }

  get id() {
    return this.uniqueId.valueId;
  }

  equals(object?: Entity<T>): boolean {
    if (!object || !isEntity(object)) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this.uniqueId.valueId === object.id;
  }

  protected abstract hasUpdates(): boolean;
  protected abstract getUpdates(): unknown;

  protected abstract createNewEntryAudit(username: string): void;
  protected abstract createUpdateEntryAudit(username: string): void;
  protected abstract createDeleteEntryAudit(username: string): void;
}

export interface AuditEntry {
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  deleted?: boolean;
}
