import { UniqueEntityId, UniqueId } from '@positiva/shared';
import { People, PeopleCreateProps } from '../../domain/entities/people.entity';

interface PeopleCreatePersistence extends PeopleCreateProps {
  id: UniqueId;
}

interface PeoplePresentation {
  id: UniqueId;
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
}

export class PeopleMapper {
  static toDomain(input: any) {
    return People.create(
      {
        name: input.name,
        height: input.height,
        mass: input.mass,
        hairColor: input.hairColor,
        skinColor: input.skinColor,
        eyeColor: input.eyeColor,
        birthYear: input.birthYear,
        gender: input.gender,
      },
      new UniqueEntityId(input.id)
    );
  }

  static toCreatePersistence(people: People): Partial<PeopleCreatePersistence> {
    return {
      id: people.id,
      name: people.name,
      height: people.height,
      mass: people.mass,
      hairColor: people.hairColor,
      skinColor: people.skinColor,
      eyeColor: people.eyeColor,
      birthYear: people.birthYear,
      gender: people.gender,

      ...people.newEntryAudit,
    };
  }

  static toPresentation(people: People): PeoplePresentation {
    return {
      id: people.id,
      name: people.name,
      height: people.height,
      mass: people.mass,
      hairColor: people.hairColor,
      skinColor: people.skinColor,
      eyeColor: people.eyeColor,
      birthYear: people.birthYear,
      gender: people.gender,
    };
  }
}
