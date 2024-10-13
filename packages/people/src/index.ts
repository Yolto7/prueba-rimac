import { getPropertyValueByType, MiddyLambdaContext, MiddyMiddleware } from '@rimac/shared';

import { Cradle, loadContainer } from './container';
import PeoplePrivateController from './presentation/private/controllers/people.controller';
import PeoplePublicController from './presentation/public/controllers/people.controller';

const handler = async <T>(
  event: any,
  context: MiddyLambdaContext,
  type: new (...args: any[]) => T,
  method: keyof T
) => {
  const container = await loadContainer(),
    middlewares = [container.cradle.errorInterceptor.use()],
    controller = getPropertyValueByType<Cradle, T>(container.cradle, type);

  return MiddyMiddleware.use(
    (controller[method] as unknown as (...args: any[]) => any).bind(controller),
    middlewares
  )(event, context);
};

// const privateMethods = getMethodNames<PeoplePrivateController>(PeoplePrivateController.prototype),
//   publicMethods = getMethodNames<PeoplePublicController>(PeoplePublicController.prototype);

export = {
  // PRIVATE
  search: (event: any, context: MiddyLambdaContext) =>
    handler<PeoplePrivateController>(event, context, PeoplePrivateController, 'search'),
  create: (event: any, context: MiddyLambdaContext) =>
    handler<PeoplePrivateController>(event, context, PeoplePrivateController, 'create'),

  // PUBLIC
  getSwapiAll: (event: any, context: MiddyLambdaContext) =>
    handler<PeoplePublicController>(event, context, PeoplePublicController, 'getSwapiAll'),
};
