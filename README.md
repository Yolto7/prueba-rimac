# Serverless - AWS Node.js Typescript, Redis and PostgreSQL

Serverless Framework with TypeScript with n layers architecture.

## Prerequisites

Remember to previously have installed nodejs, serverless, postgresql, pgAdmin and redis.

- [`serverless-framework`](https://github.com/serverless/serverless)
- [`pgAdmin`](https://www.pgadmin.org/)
- [`node.js`](https://nodejs.org)
- [`redis`](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)

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
- step 5: Run the 'npm run format:fix' command to fix prettier errors.
- step 6: Run the 'npm run lint' command to see which files have linter errors.

Happy Code 🎸
