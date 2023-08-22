import pgPromise from 'pg-promise';
import config from './config';

// Initializing the library:
const pgp: any = pgPromise({
  noWarnings: false,
});

// Creating the database
let dbp: any = null;

export function connectDB() {
  return new Promise((resolve, reject) => {
    const dbConnection = `postgres://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
    if (!dbp) {
      dbp = pgp(dbConnection);
    }

    dbp
      .connect()
      .then((obj: any) => {
        obj.done();
        return resolve({
          dbp,
          pgp,
        });
      })
      .catch((error: any) => {
        return reject({
          error,
          msj: `Error connecting to database `,
        });
      });
  });
}

export function killDBPool() {
  return new Promise((resolve) => {
    if (dbp) {
      pgp.end();
    }

    return resolve(true);
  });
}
