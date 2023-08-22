import { loadControllers } from 'awilix-express';
import { Context } from 'aws-lambda';
import serverless, { Handler } from 'serverless-http';
import { Request, Response, NextFunction } from 'express';

import pkg from '../package.json';
import { loadContainer } from './container';
import app from './app';
import logger from './common/logger';
import config from './config';
import { AppError } from './common/error';

loadContainer(app);

// Loads all controllers in the `routes` folder
// relative to the current working directory.
// This is a glob pattern.
app.use(loadControllers('routes/*.js', { cwd: __dirname }));

app.listen(app.get('port'), () => {
  if (!config.isProduction) {
    const route = () => `http://localhost:${config.PORT}`;
    logger.info(`Hello, your app is ready on ${route()}`);
    logger.info('To shut it down, press <CTRL> + C at any time.');
    logger.info('-------------------------------------------------------');
    logger.info(`Environment  : ${config.NODE_ENV}`);
    logger.info(`Version      : ${pkg.version}`);
    logger.info(`API Info     : ${route()}`);
    logger.info('-------------------------------------------------------');
  } else {
    logger.info(`${pkg.name} is up and running.`);
  }
});

// middlewares for error
app.use((error: AppError, _req: Request, res: Response, _next: NextFunction): any => {
  logger.error(error.message);

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

export const handler: Handler = serverless(app, {
  request: function (req: any, event: any, context: Context) {
    context.callbackWaitsForEmptyEventLoop = false;
    req.event = event;
    req.context = context;
  },
});
