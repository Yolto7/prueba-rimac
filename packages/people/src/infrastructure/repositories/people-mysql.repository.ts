import { RowDataPacket } from 'mysql2/promise';

import {
  AppError,
  ErrorTypes,
  Logger,
  MysqlClientFactory,
  UserAuthProvider,
  MysqlCriteriaConverter,
  Criteria,
} from '@rimac/shared';

import { Config } from '../../config';
import { People } from '../../domain/entities/people.entity';
import { PeopleDomain, PeopleMapper } from '../mappers/people.mapper';
import { FilterResponse, PeopleRepository } from '../../domain/repositories/people.repository';

export default class PeopleMysqlRepository implements PeopleRepository {
  private readonly tableName: string;

  constructor(
    private readonly config: Config,
    private readonly logger: Logger,
    private readonly db: MysqlClientFactory,
    private readonly mysqlCriteriaConverter: MysqlCriteriaConverter,
    private readonly userAuthProvider: UserAuthProvider
  ) {
    this.tableName = this.config.PEOPLE_TABLE_NAME;
  }

  async matching(criteria: Criteria): Promise<FilterResponse> {
    try {
      const query = this.mysqlCriteriaConverter.convert(criteria),
        sql = `SELECT id,
                    name,
                    height, 
                    mass, 
                    hairColor, 
                    skinColor,
                    eyeColor, 
                    birthYear, 
                    gender,
                    DATE_FORMAT(createdAt, "%Y-%m-%d %H:%i:%s") as createdAt
                FROM ${this.tableName}
                ${query.filter} 
                ${query.sort} 
                ${criteria.isTotal ? '' : query.pagination}`;

      const [[rows = []], [pagination = []]] = await Promise.all([
          this.db.query<RowDataPacket[]>({
            sql,
            values: query.values,
          }),
          this.db.query<RowDataPacket[]>({
            sql: `SELECT count(1) as total FROM ${this.tableName} ${query.filter}`,
            values: query.values,
          }),
        ]),
        total = pagination[0]?.total || 0;

      return {
        people: rows.map((e) => PeopleMapper.toDomain(e as PeopleDomain)),
        total,
        page: query.page,
        take: query.take,
        totalPages: Math.ceil(total / query.take),
      };
    } catch (error) {
      this.logger.error(`Error in PeopleRepository of matching: ${JSON.stringify(error)}`);
      throw new AppError(ErrorTypes.BAD_REQUEST, 'Database unavailable', 'ERR_DATABASE');
    }
  }

  async create(input: People): Promise<void> {
    try {
      input.createNewEntryAudit(this.userAuthProvider.get()?.document);
      const keys = [],
        values = [];

      for (const [key, value] of Object.entries(PeopleMapper.toCreatePersistence(input))) {
        keys.push(key);
        values.push(value);
      }

      await this.db.query({
        sql: `INSERT INTO ${this.tableName}(${keys.join(', ')}) VALUES (${Array(keys.length)
          .fill('?')
          .join(', ')})`,
        values,
      });
    } catch (error) {
      this.logger.error(`Error in PeopleRepository of create: ${JSON.stringify(error)}`);
      throw new AppError(ErrorTypes.BAD_REQUEST, 'Database unavailable', 'ERR_DATABASE');
    }
  }
}
