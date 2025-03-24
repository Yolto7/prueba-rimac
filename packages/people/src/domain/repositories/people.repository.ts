import { Criteria } from '@rimac/shared';

import { People } from '../entities/people.entity';

export interface FilterResponse {
  people: People[];
  total: number;
  page: number;
  take: number;
  totalPages: number;
}

export interface PeopleRepository {
  matching(criteria: Criteria): Promise<FilterResponse>;
  create(input: People): Promise<void>;
}
