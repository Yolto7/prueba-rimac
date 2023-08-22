import { connectDB } from '../../database';
import { IPeople } from './domain/people.domain';
import { AppError, ERRORS } from '../../common/error';

export default class PeopleRepository {
  dbp: any;
  pgp: any;

  async getAll() {
    try {
      const result: any = await connectDB();
      this.dbp = result.dbp;
      this.pgp = result.pgp;

      let sql = `SELECT * FROM public.people`;
      sql = this.pgp.as.format(sql);
      const data = await this.dbp.result(sql);

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
      const result: any = await connectDB();
      this.dbp = result.dbp;
      this.pgp = result.pgp;

      let sql = `INSERT INTO public.people(name, height, mass, hair_color, skin_color, eye_color, birth_year, gender)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
      sql = this.pgp.as.format(sql, Object.values(dbEntity));
      await this.dbp.result(sql);

      sql = `SELECT MAX(id_people) AS new_id FROM public.people`;
      sql = this.pgp.as.format(sql);
      const data = await this.dbp.result(sql);

      return data.rows[0];
    } catch (error) {
      console.error(error);
      throw new AppError(ERRORS.DB_ERROR, 'Database is not available');
    }
  }
}
