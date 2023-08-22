import PeopleService from '../../../src/services/people.service';

describe('People Service', () => {
  const peopleRepository = { getAll: jest.fn(), create: jest.fn(), dbp: jest.mock, pgp: jest.mock };
  const swapiProxy = { getPeople: jest.fn(), axios: jest.mock };
  const peopleService = new PeopleService(peopleRepository, swapiProxy);

  it('Should get people of swapi', async () => {
    const swapiMock = [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        created: '2014-12-09T13:50:51.644000Z',
      },
    ];
    jest.spyOn(swapiProxy, 'getPeople').mockImplementation(async () => swapiMock);

    const result = await peopleService.getAllBySwapi();

    expect(result).toBeDefined();
  });

  it('Should create people', async () => {
    jest.spyOn(peopleRepository, 'create').mockImplementation(async () => 8);

    const cardMock = {
      name: 'Joaquin',
      height: 178,
      mass: 85,
      hair_color: 'red',
      skin_color: 'black',
      eye_color: 'blue',
      birth_year: '19BY',
      gender: 'male',
    };
    const result = await peopleService.create(cardMock);

    expect(result).toBeDefined();
  });

  it('Should get people of database', async () => {
    const peopleMock = [
      {
        id: 9,
        name: 'Luke Skywalker',
        height: 172,
        mass: 77,
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        created: '2014-12-09T13:50:51.644000Z',
      },
    ];
    jest.spyOn(peopleRepository, 'getAll').mockImplementation(async () => peopleMock);

    const result = await peopleService.getAll();

    expect(result).toBeDefined();
  });
});
