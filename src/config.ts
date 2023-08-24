import { config } from 'dotenv';
config({
  path: `./.env`,
});

const ENVIRONMENTS = {
  DEBUG: 'debug',
  DEV: 'development',
  STG: 'staging',
  PROD: 'production',
};

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,

  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,

  TR_PAPERTRAIL_HOST: process.env.TR_PAPERTRAIL_HOST,
  TR_PAPERTRAIL_PORT: process.env.TR_PAPERTRAIL_PORT,
  TR_PAPERTRAIL_LOGLEVEL: process.env.TR_PAPERTRAIL_LOGLEVEL,

  SWAPI_URL: process.env.SWAPI_URL || 'https://swapi.py4e.com/api',

  isDebug: process.env.NODE_ENV === ENVIRONMENTS.DEBUG,
  isDevelopment: process.env.NODE_ENV === ENVIRONMENTS.DEV,
  isStaging: process.env.NODE_ENV === ENVIRONMENTS.STG,
  isProduction: process.env.NODE_ENV === ENVIRONMENTS.PROD,
};
