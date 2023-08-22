# Serverless - AWS Node.js Typescript, Express and PostgreSQL

Serverless Framework with TypeScript with n layers architecture.

## Prerequisites

Remember to previously have installed nodejs, serverless, postgresql and pgAdmin.

- [`serverless-framework`](https://github.com/serverless/serverless)
- [`pgAdmin`](https://www.pgadmin.org/)
- [`node.js`](https://nodejs.org)
- [`redis`](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)

Run the sql script inside the database folder, so that it creates the database and its corresponding table.

```
CREATE DATABASE example;

CREATE TABLE people (
  id_people serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  height INTEGER NOT NULL,
  mass INTEGER NOT NULL,
  hair_color VARCHAR(50) NOT NULL,
  skin_color VARCHAR(50) NOT NULL,
  eye_color VARCHAR(50) NOT NULL,
  birth_year VARCHAR(50) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

```

## Run the project locally

- step 1: Install all dependencies with the 'npm install' command.
- step 2: Create an .env file to start the configuration of your project in localhost environment.

```
NODE_ENV=staging

DB_USER='<your user>'
DB_PASS='<your password>'
DB_HOST=localhost
DB_NAME='<your database name>'
DB_PORT=5432

REDISCLOUD_URL=redis://127.0.0.1:6379
REDIS_PARTITION_KEY=Testing.

```

- step 3: Run the command 'npm run dev' to launch the application locally.
- step 4: Run the 'npm run test' command to execute the application tests.

Happy Code 🎸
