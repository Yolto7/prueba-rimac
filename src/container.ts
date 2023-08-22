import { createContainer, asClass, InjectionMode, Lifetime } from 'awilix';
import path from 'node:path';
import { Application } from 'express';
import { scopePerRequest } from 'awilix-express';

import PeopleRepository from './services/repositories/people.repository';
import SwapiProxy from './services/proxies/swapi.proxy';

function toFwSlash(path: string) {
  return path.replace(/\\/g, '/');
}

export const loadContainer = (app: Application) => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  container.register({
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

  app.use(scopePerRequest(container));
};
