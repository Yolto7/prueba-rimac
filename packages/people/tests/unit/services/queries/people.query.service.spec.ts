import { loadContainer } from '../../../../src/container';

const container = loadContainer();

describe('People Queries Service', () => {
  const peopleQueriesService = container.cradle.peopleQueriesService;

  it('Should get people of swapi', async () => {
    const result = await peopleQueriesService.getSwapiAll();
    expect(result).toBeDefined();
  });

  it('Should get people of database', async () => {
    const result = await peopleQueriesService.search();
    expect(result).toBeDefined();
  });
});
