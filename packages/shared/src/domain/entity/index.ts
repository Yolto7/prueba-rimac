import { formatDate } from '../../infrastructure/helpers/date';
import { RIMAC_CONSTANTS } from '../constants';
import { UniqueEntityId } from './uniqueEntityId';

export interface AuditEntry {
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  deleted?: boolean;
}

const isEntity = (v: unknown): v is Entity<unknown extends AuditEntry ? unknown : AuditEntry> => {
  return v instanceof Entity;
};

export abstract class Entity<T extends AuditEntry> {
  protected readonly uniqueId: UniqueEntityId;
  protected readonly props: T;

  constructor(props: T, id?: UniqueEntityId) {
    this.uniqueId = id || new UniqueEntityId();
    this.props = props;
  }

  get id() {
    return this.uniqueId.valueId;
  }
  get newEntryAudit() {
    return {
      createdAt: this.props.createdAt,
      createdBy: this.props.createdBy,
      deleted: this.props.deleted,
    };
  }
  get updateEntryAudit() {
    return {
      updatedAt: this.props.updatedAt,
      updatedBy: this.props.updatedBy,
    };
  }
  get deleteEntryAudit() {
    return {
      deletedAt: this.props.deletedAt,
      deletedBy: this.props.deletedBy,
      deleted: this.props.deleted,
    };
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

  hasUpdates(): boolean {
    return Object.values(this.props).some((valueObject) => valueObject.isModified);
  }

  createNewEntryAudit(username?: string) {
    this.props.createdAt = formatDate({ date: new Date() });
    this.props.createdBy = username || RIMAC_CONSTANTS.USERS.SYSTEM;
    this.props.deleted = false;
  }
  createUpdateEntryAudit(username?: string) {
    this.props.updatedAt = formatDate({ date: new Date() });
    this.props.updatedBy = username || RIMAC_CONSTANTS.USERS.SYSTEM;
  }
  createDeleteEntryAudit(username?: string) {
    this.props.deletedAt = formatDate({ date: new Date() });
    this.props.deletedBy = username || RIMAC_CONSTANTS.USERS.SYSTEM;
    this.props.deleted = true;
  }
}
