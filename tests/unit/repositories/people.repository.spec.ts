import PeopleRepository from '../../../src/services/repositories/people.repository';

describe('People Repository', () => {
  const peopleRepository = new PeopleRepository();

  it('Should get people', async () => {
    const result = await peopleRepository.getAll();
    expect(result).toBeDefined();
  });

  it('Should create people', async () => {
    const cardMock = {
      name: 'Joaquin',
      height: 175,
      mass: 72,
      hair_color: 'red',
      skin_color: 'pink',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };
    const result = await peopleRepository.create(cardMock);
    expect(result).toBeDefined();
  });
});
