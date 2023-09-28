import { loadControllers, scopePerRequest } from 'awilix-express';
import { Callback, Context } from 'aws-lambda';
import serverless, { Handler } from 'serverless-http';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { loadContainer } from './container';
import { AppError } from './common/error';
import pkg from '../package.json';
import config from './config';

let server: Handler;

function appInitializer() {
  const app = express();

  // Settings
  app.set('json spaces', 2);

  // Middlewares
  const corsOptions = {
    // origin: "http://localhost:3000",
  };

  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());

  app.use(scopePerRequest(loadContainer()));

  // Loads all controllers in the `routes` folder
  // relative to the current working directory.
  app.use(loadControllers('routes/*.js', { cwd: __dirname }));

  // middlewares for error
  app.use((error: AppError, _req: Request, res: Response, _next: NextFunction): any => {
    if (error.errorCode) {
      res.status(400);
      res.send({
        success: 'false',
        code: error.errorCode,
        message: error.message,
        payload: error.payload,
      });
    } else {
      res.status(500);
      res.send({
        success: 'false',
        message: error.message,
      });
    }
  });

  return app;
}

function serverlessInitializer() {
  const app = appInitializer();
  return serverless(app);
}

function serverInitializer() {
  const app = appInitializer();

  app.listen(config.PORT, () => {
    const route = `http://localhost:${config.PORT}`;

    console.log(`Hello, your app is ready on ${route}`);
    console.log('To shut it down, press <CTRL> + C at any time.');
    console.log('-------------------------------------------------------');
    console.log(`Environment  : ${config.NODE_ENV}`);
    console.log(`Version      : ${pkg.version}`);
    console.log(`API Info     : ${route}`);
    console.log('-------------------------------------------------------');
  });
}

if (config.isDebug) {
  serverInitializer();
}

export const handler = (event: any, context: Context) => {
  server = server ?? serverlessInitializer();
  context.callbackWaitsForEmptyEventLoop = false;
  return server(event, context);
};
