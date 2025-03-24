import dotenv from 'dotenv';

import { ConfigBase, RIMAC_CONSTANTS } from '@rimac/shared';

dotenv.config();

export interface Config extends ConfigBase {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;

  PEOPLE_TABLE_NAME: string;

  SWAPI_API_BASE_URL: string;
}

const {
  NODE_ENV = RIMAC_CONSTANTS.ENVIRONMENTS.STG,

  AWS_ACCESS_KEY_ID = '',
  AWS_SECRET_ACCESS_KEY = '',
  AWS_REGION_NAME = '',

  DATABASE_HOST = 'localhost',
  DATABASE_PORT = 3306,
  DATABASE_USER = 'root',
  DATABASE_PASSWORD = '',
  DATABASE_NAME = '',

  PEOPLE_TABLE_NAME = '',

  SWAPI_API_BASE_URL = '',
} = process.env;

export const config: Config = {
  NODE_ENV,

  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION_NAME,

  DATABASE_HOST,
  DATABASE_PORT: Number(DATABASE_PORT || 3306),
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,

  PEOPLE_TABLE_NAME,

  SWAPI_API_BASE_URL,
  isDebug: process.env.NODE_ENV === RIMAC_CONSTANTS.ENVIRONMENTS.DEBUG,
  isDevelopment: process.env.NODE_ENV === RIMAC_CONSTANTS.ENVIRONMENTS.DEV,
  isStaging: process.env.NODE_ENV === RIMAC_CONSTANTS.ENVIRONMENTS.STG,
  isProduction: process.env.NODE_ENV === RIMAC_CONSTANTS.ENVIRONMENTS.PROD,
};
