import {
  Criteria,
  filterDeleted,
  Filters,
  Order,
  OrderTypes,
  Query,
  QueryInput,
} from '@rimac/shared';

import { loadContainer } from '../../../src/container';
import { People } from '../../../src/domain/entities/people.entity';

const container = loadContainer();

describe('People Repository', () => {
  const peopleRepository = container.cradle.peopleMysqlRepository;

  it('Should get people', async () => {
    const input: QueryInput = {
        filters: [filterDeleted()],
        orderBy: 'createdAt',
        orderType: OrderTypes.DESC,
      },
      query = new Query(input.filters, input.orderBy, input.orderType, input.page, input.take),
      criteria = new Criteria(
        Filters.fromValues(query.filters),
        Order.fromValues(query.orderBy, query.orderType),
        query.page,
        query.take
      );

    const result = await peopleRepository.matching({ criteria, isTotal: query.isTotal });
    expect(result).toBeDefined();
  });

  it('Should create people', async () => {
    const result = await peopleRepository.create(
      People.create({
        name: 'Joaquin',
        height: 175,
        mass: 72,
        hairColor: 'red',
        skinColor: 'pink',
        eyeColor: 'blue',
        birthYear: '19BBY',
        gender: 'male',
      })
    );
    expect(result).toBeDefined();
  });
});
