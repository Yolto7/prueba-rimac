import { AggregateRoot, AuditEntry, UniqueEntityId, formatDate } from '@positiva/shared';

import { PeopleName } from './valueObjects/name.vo';
import { PeopleHeight } from './valueObjects/height.vo';
import { PeopleMass } from './valueObjects/mass.vo';
import { PeopleHairColor } from './valueObjects/hairColor.vo';
import { PeopleSkincolor } from './valueObjects/skinColor.vo';
import { PeopleEyecolor } from './valueObjects/eyeColor.vo';
import { PeopleBirthyear } from './valueObjects/birthYear.vo';
import { PeopleGender } from './valueObjects/gender.vo';

interface PeopleProps extends AuditEntry {
  name: PeopleName;
  height: PeopleHeight;
  mass: PeopleMass;
  hairColor: PeopleHairColor;
  skinColor: PeopleSkincolor;
  eyeColor: PeopleEyecolor;
  birthYear: PeopleBirthyear;
  gender: PeopleGender;
}

export interface PeopleCreateProps extends AuditEntry {
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
}

export class People extends AggregateRoot<PeopleProps> {
  private constructor(props: PeopleProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get name() {
    return this.props.name.value;
  }
  get height() {
    return this.props.height.value;
  }
  get mass() {
    return this.props.mass.value;
  }
  get hairColor() {
    return this.props.hairColor.value;
  }
  get skinColor() {
    return this.props.skinColor.value;
  }
  get eyeColor() {
    return this.props.eyeColor.value;
  }
  get birthYear() {
    return this.props.birthYear.value;
  }
  get gender() {
    return this.props.gender.value;
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

  static create(props: PeopleCreateProps, id?: UniqueEntityId): People {
    const defaultProps: PeopleProps = {
      name: PeopleName.create(props.name),
      height: PeopleHeight.create(props.height),
      mass: PeopleMass.create(props.mass),
      hairColor: PeopleHairColor.create(props.hairColor),
      skinColor: PeopleSkincolor.create(props.skinColor),
      eyeColor: PeopleEyecolor.create(props.eyeColor),
      birthYear: PeopleBirthyear.create(props.birthYear),
      gender: PeopleGender.create(props.gender),
      createdAt: props.createdAt,
    };

    return new People(defaultProps, id);
  }

  hasUpdates() {
    return Object.values(this.props).some((valueObject) => valueObject.isModified);
  }

  getUpdates() {
    const updates: Partial<PeopleCreateProps> = {};
    for (const [key, value] of Object.entries(this.props)) {
      if (value.isModified) {
        updates[key as keyof PeopleCreateProps] = value.value;
      }
    }

    return updates;
  }

  createNewEntryAudit(username: string) {
    this.props.createdAt = formatDate(new Date());
    this.props.createdBy = username;
    this.props.deleted = false;
  }
  createUpdateEntryAudit(username: string) {
    this.props.updatedAt = formatDate(new Date());
    this.props.updatedBy = username;
  }
  createDeleteEntryAudit(username: string) {
    this.props.deletedAt = formatDate(new Date());
    this.props.deletedBy = username;
    this.props.deleted = true;
  }
}
