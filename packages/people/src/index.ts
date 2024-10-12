import { MiddyMiddleware } from '@rimac/shared';

import { loadContainer } from './container';

const setupContainer = async () => {
  const container = await loadContainer(),
    middlewares = [container.cradle.errorInterceptor.use()],
    peopleController = container.cradle.peopleController;

  return { peopleController, middlewares };
};

export = {
  search: async (event: any, context: any) => {
    const { peopleController, middlewares } = await setupContainer();
    return MiddyMiddleware.use(peopleController.search.bind(peopleController), middlewares)(
      event,
      context
    );
  },
  getSwapiAll: async (event: any, context: any) => {
    const { peopleController, middlewares } = await setupContainer();
    return MiddyMiddleware.use(peopleController.getSwapiAll.bind(peopleController), middlewares)(
      event,
      context
    );
  },
  create: async (event: any, context: any) => {
    const { peopleController, middlewares } = await setupContainer();
    return MiddyMiddleware.use(peopleController.create.bind(peopleController), middlewares)(
      event,
      context
    );
  },
};
