import { MiddyMiddleware } from '@positiva/shared';

import { loadContainer } from './container';

const container = loadContainer(),
  middlewares = [container.cradle.errorInterceptor.use()],
  peopleController = container.cradle.peopleController;

export = {
  search: MiddyMiddleware.use(peopleController.search.bind(peopleController), middlewares),
  getSwapiAll: MiddyMiddleware.use(
    peopleController.getSwapiAll.bind(peopleController),
    middlewares
  ),
  create: MiddyMiddleware.use(peopleController.create.bind(peopleController), middlewares),
};
