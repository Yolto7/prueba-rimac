import {
  createContainer,
  asClass,
  InjectionMode,
  Lifetime,
  AwilixContainer,
  asValue,
} from 'awilix';
import path from 'node:path';

import PeopleRepository from './services/repositories/people.repository';
import SwapiProxy from './services/proxies/swapi.proxy';
import { connectDB } from './database';

function toFwSlash(path: string) {
  return path.replace(/\\/g, '/');
}

export const loadContainer = () => {
  const container: AwilixContainer = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  container.register({
    // Database connection
    db: asValue(connectDB()),

    // Repositories
    peopleRepository: asClass(PeopleRepository).scoped(),

    // Proxies
    swapiProxy: asClass(SwapiProxy).transient(),
  });

  // load all services automatically
  container.loadModules([toFwSlash(path.join(__dirname, `services/`, '*.service.js'))], {
    // set them to be injected in camelCase
    formatName: 'camelCase',
    resolverOptions: {
      // we want all services to be scoped per request so we can inject certain variables
      lifetime: Lifetime.SCOPED,
    },
  });

  return container;
};
