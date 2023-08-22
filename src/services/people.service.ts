import { translateKey } from '../common/translate';
import SwapiProxy from './proxies/swapi.proxy';
import PeopleRepository from './repositories/people.repository';

export default class PeopleService {
  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly swapiProxy: SwapiProxy
  ) {}

  private _normalizeData(data: any[]) {
    const newArray = [];
    for (const item of data) {
      let newObject: any = {};

      for (const key of Object.keys(item)) {
        const value = item[key];
        const newKey = translateKey(key);
        if (newKey) {
          newObject[newKey] = value;
        }
      }
      newArray.push(newObject);
    }

    return newArray;
  }

  async getAllBySwapi() {
    const result = await this.swapiProxy.getPeople();
    return this._normalizeData(result);
  }

  async getAll() {
    return this.peopleRepository.getAll();
  }

  async create(entity: any) {
    const peopleToCreate = {
      name: entity.name,
      height: entity.height,
      mass: entity.mass,
      hair_color: entity.hair_color,
      skin_color: entity.skin_color,
      eye_color: entity.eye_color,
      birth_year: entity.birth_year,
      gender: entity.gender,
    };
    return await this.peopleRepository.create(peopleToCreate);
  }
}
