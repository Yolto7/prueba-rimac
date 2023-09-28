import { Pool } from 'pg';
import config from './config';

// Creating the database
let connection: Pool;

export function connectDB() {
  if (!connection) {
    connection = new Pool({
      connectionString: `postgres://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  return connection;
}
