import { IPeople } from './domain/people.domain';
import { AppError, ERRORS } from '../../common/error';
import { Pool } from 'pg';

export default class PeopleRepository {
  constructor(private readonly db: Pool) {}

  async getAll() {
    try {
      const data = await this.db.query(`SELECT * FROM public.people`);
      return data.rows;
    } catch (error) {
      console.error(error);
      throw new AppError(ERRORS.DB_ERROR, 'Database is not available');
    }
  }

  async create(entity: IPeople) {
    try {
      const dbEntity = {
        name: entity.name,
        height: entity.height,
        mass: entity.mass,
        hair_color: entity.hair_color,
        skin_color: entity.skin_color,
        eye_color: entity.eye_color,
        birth_year: entity.birth_year,
        gender: entity.gender,
      };

      const sql = `INSERT INTO public.people(name, height, mass, hair_color, skin_color, eye_color, birth_year, gender)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
      await this.db.query(sql, Object.values(dbEntity));

      const data = await this.db.query(`SELECT MAX(id_people) AS new_id FROM public.people`);
      return data.rows[0];
    } catch (error) {
      console.error(error);
      throw new AppError(ERRORS.DB_ERROR, 'Database is not available');
    }
  }
}
