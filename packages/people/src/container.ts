import { createContainer, InjectionMode, asValue, AwilixContainer, asClass } from 'awilix';

import {
  Logger,
  WinstonLogger,
  UserAuthProvider,
  MysqlClientFactory,
  MysqlCriteriaConverter,
  ErrorInterceptor,
  AxiosInstance,
} from '@rimac/shared';

import { Config, configuration } from './config';

import PeopleMysqlRepository from './infrastructure/repositories/people-mysql.repository';
import PeopleDomainService from './domain/services/people.domain.service';
import PeopleQueriesService from './application/services/queries/people.query.service';
import PeopleCreateCommandService from './application/services/commands/people-create.command.service';
import PeoplePrivateController from './presentation/private/controllers/people.controller';
import PeoplePublicController from './presentation/public/controllers/people.controller';
import { SwapiProxyAdapter } from './infrastructure/adapters/swapiProxy-axios.adapter';

export interface Cradle {
  config: Config;
  db: MysqlClientFactory;
  axios: AxiosInstance;
  logger: Logger;

  errorInterceptor: ErrorInterceptor;

  mysqlCriteriaConverter: MysqlCriteriaConverter;

  userAuthProvider: UserAuthProvider;

  peopleMysqlRepository: PeopleMysqlRepository;

  peopleDomainService: PeopleDomainService;

  peopleQueriesService: PeopleQueriesService;

  peopleCreateCommandService: PeopleCreateCommandService;

  swapiProxyAdapter: SwapiProxyAdapter;

  peoplePrivateController: PeoplePrivateController;
  peoplePublicController: PeoplePublicController;
}

export const loadContainer = async (): Promise<AwilixContainer<Cradle>> => {
  const container = createContainer<Cradle>({
    injectionMode: InjectionMode.CLASSIC,
  });

  container.register({
    // Config
    config: asValue(configuration),

    // Logger
    logger: asClass(WinstonLogger)
      .inject((container: AwilixContainer) => ({
        isDebug: container.cradle.config.isDebug,
      }))
      .singleton()
      .scoped(),

    // Middlewares
    errorInterceptor: asClass(ErrorInterceptor).singleton().scoped(),

    // Criteria
    mysqlCriteriaConverter: asClass(MysqlCriteriaConverter).singleton().scoped(),

    // UserAuth Provider
    userAuthProvider: asClass(UserAuthProvider).singleton().scoped(),

    // Repositories
    peopleMysqlRepository: asClass(PeopleMysqlRepository)
      .inject((container: AwilixContainer) => ({
        criteriaConverter: container.cradle.mysqlCriteriaConverter,
      }))
      .scoped(),

    // Domain Services
    peopleDomainService: asClass(PeopleDomainService)
      .inject((container: AwilixContainer) => ({
        peopleRepository: container.cradle.peopleMysqlRepository,
      }))
      .scoped(),

    // Application Services
    peopleQueriesService: asClass(PeopleQueriesService)
      .inject((container: AwilixContainer) => ({
        peopleRepository: container.cradle.peopleMysqlRepository,
        swapiProxyPort: container.cradle.swapiProxyAdapter,
      }))
      .scoped(),

    peopleCreateCommandService: asClass(PeopleCreateCommandService)
      .inject((container: AwilixContainer) => ({
        peopleRepository: container.cradle.peopleMysqlRepository,
      }))
      .scoped(),

    // Infrastructure Adapters
    swapiProxyAdapter: asClass(SwapiProxyAdapter).transient(),

    // Presentation Controllers
    peoplePrivateController: asClass(PeoplePrivateController).scoped(),
    peoplePublicController: asClass(PeoplePublicController).scoped(),
  });

  container.register({
    // Database
    db: asValue(
      MysqlClientFactory.getInstance(
        {
          DATABASE_HOST: container.cradle.config.DATABASE_HOST,
          DATABASE_PORT: container.cradle.config.DATABASE_PORT,
          DATABASE_USER: container.cradle.config.DATABASE_USER,
          DATABASE_PASSWORD: container.cradle.config.DATABASE_PASSWORD,
          DATABASE_NAME: container.cradle.config.DATABASE_NAME,
        },
        container.cradle.logger
      )
    ),
  });

  return container;
};
