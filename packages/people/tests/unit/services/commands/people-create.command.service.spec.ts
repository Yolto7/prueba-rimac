import { loadContainer } from '../../../../src/container';

const container = loadContainer();

describe('People CreateCommand Service', () => {
  const peopleCreateCommandService = container.cradle.peopleCreateCommandService;

  it('Should create people', async () => {
    const result = await peopleCreateCommandService.handle({
      name: 'Joaquin',
      height: 178,
      mass: 85,
      hairColor: 'red',
      skinColor: 'black',
      eyeColor: 'blue',
      birthYear: '19BY',
      gender: 'male',
    });

    expect(result).toBeDefined();
  });
});
